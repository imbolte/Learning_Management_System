import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../utils/redis";

import userModel from "../models/user_model";

// authenticated user

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Invalid token. Please login again", 400));
    }

    let user = await redis.get(decoded.id);

    if (!user) {
      const userData = await userModel.findById(decoded.id);
      if (!userData) {
        return next(new ErrorHandler("User not found", 400));
      }
      user = JSON.stringify(userData);
      await redis.set(decoded.id, user);
    }


    req.user = JSON.parse(user);
    next();
  }
);

// validate user role

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403)
      );
    }

    next();
  }
}