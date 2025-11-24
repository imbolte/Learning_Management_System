import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../../models/user_model";
import ErrorHandler from "../../utils/ErrorHandler";
import { CatchAsyncError } from "../catchAsyncErrors";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../../utils/jwt";
import redis from "../../utils/redis";

import { getUserById } from "../../services/use_services";
import { v2 as cloudinary } from "cloudinary";

// ========== Types ==========

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

// ========== Helpers ==========

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// ========== Controllers ==========

// Register user
export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request body:", req.body);
      console.log("Content-Type:", req.headers["content-type"]);

      const { name, email, password } = req.body as IRegistrationBody;

      if (!name || !email || !password) {
        return next(
          new ErrorHandler("Please provide name, email and password", 400)
        );
      }

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("email already exist!!!", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "../../mails/activation_mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation_mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email : ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error) {
        return next(new ErrorHandler((error as Error).message, 400));
      }
    } catch (error) {
      return next(new ErrorHandler((error as Error).message, 400));
    }
  }
);

// Activate user
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("Email already exist", 400));
      }

      await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login user
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear cookies
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = (req as any).user?._id;

      if (userId) {
        await redis.del(userId.toString());
      }

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update access token (refresh)
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Could not refresh access token. Please login again";

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(new ErrorHandler(message, 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get user info (/api/me)
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?._id;

      if (!userId) {
        return next(new ErrorHandler("Not authenticated", 401));
      }

      // If getUserById handles sending the response:
      await getUserById(userId, res);

      // If instead getUserById just returns the user, you would do:
      // const user = await getUserById(userId);
      // return res.status(200).json({ success: true, user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//social auth

interface ISocialAuthBody {
  name: string;
  email: string;
  avatar?: string;
}

export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });
      if (user) {
        const newUser = await userModel.create({ name, email, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user info

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?._id;
      const { name, email } = req.body as IUpdateUserInfo;

      const user = await userModel.findById(userId);
      if (email && user) {
        const isEmailExist = await userModel.find({ email });
        if (isEmailExist) {
          return next(new ErrorHandler("Email already exist", 400));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
      }
      await user?.save();
      await redis.set(userId.toString(), JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: "User info updated successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user password

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please provide old and new password", 400)
        );
      }

      const user = await userModel
        .findById((req as any).user?._id)
        .select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Password not set for this user", 400));
      }

      const isPasswordMatched = await user?.comparePassword(oldPassword);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }

      user.password = newPassword;
      await user.save();

      await redis.set(req.user?._id.toString(), JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "Password updated successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IUpdateProfilePicture {
  avatar: string;
}

//update profile picture

export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfilePicture;

      const userId = req.user._id;

      const user = await userModel.findById(userId);
      // If user has an existing avatar, remove it from Cloudinary
      if (avatar && user) {
        if (user?.avatar?.public_id) {
          await cloudinary.uploader.destroy(user.avatar.public_id);

          const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
        } else {
          const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();

      await redis.set(userId.toString(), JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// export const updateProfilePicture = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { avatar } = req.body;
//       const userId = String(req.user?._id);
//       const user = await userModel.findById(userId);

//       if (avatar && user) {
//         // if user have already picture
//         if (user?.avatar?.public_id) {
//           //first delete image
//           await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

//           //second update picture
//           const myCloud = cloudinary.v2.uploader.upload(avatar, {
//             folder: "avatars",
//             width: 150,
//           });
//           user.avatar = {
//             // public_id:myCloud.public_id,
//             // url:myCloud.secure_url
//             public_id: (await myCloud).public_id,
//             url: (await myCloud).secure_url,
//           };
//         } else {
//           //create new profile picture
//           const myCloud = cloudinary.v2.uploader.upload(avatar, {
//             folder: "avatars",
//             width: 150,
//           });
//           user.avatar = {
//             // public_id:myCloud.public_id,
//             // url:myCloud.secure_url
//             public_id: (await myCloud).public_id,
//             url: (await myCloud).secure_url,
//           };
//         }
//       }

//       await user?.save();
//       await redis.set(userId, JSON.stringify(user));

//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
