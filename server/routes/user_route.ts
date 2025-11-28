// // import express from "express";

// // // import { registrationUser } from "../middleware/controllers/user_controller";

// // import { registrationUser, activateUser, loginUser, logoutUser, updateAccessToken } from "../middleware/controllers/user_controller";
// // import { authorizeRoles, isAuthenticated } from "../middleware/auth";


// // const userRouter = express.Router();

// // userRouter.post('/registration', registrationUser);
// // userRouter.post('/activate-user', activateUser);
// // userRouter.post('/login', loginUser);
// // userRouter.get('/logout',isAuthenticated , logoutUser);
// // userRouter.get('/refresh', updateAccessToken);


// // export default userRouter;




// import express from "express";
// import {
//   registrationUser,
//   activateUser,
//   loginUser,
//   logoutUser,
//   updateAccessToken,
//   getUserInfo,
//   socialAuth,
//   updateUserInfo,
//   updatePassword,
// } from "../middleware/controllers/user_controller";
// import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// const userRouter = express.Router();

// userRouter.post("/registration", registrationUser);
// userRouter.post("/activate-user", activateUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/logout", isAuthenticated, logoutUser);
// userRouter.get("/refresh", updateAccessToken);
// userRouter.get("/me", isAuthenticated, getUserInfo);

// // ➜ This is the endpoint your frontend calls: GET /api/me
// userRouter.get("/me", isAuthenticated, getUserInfo);
// userRouter.post("/social-auth", socialAuth);
// userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
// userRouter.put("/update-user-password", isAuthenticated, updatePassword);



// export default userRouter;


import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../middleware/controllers/user_controller";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

// Admin routes
userRouter.get("/get-users", isAuthenticated, authorizeRoles("admin"), getAllUsers);
userRouter.put("/update-user-role", isAuthenticated, authorizeRoles("admin"), updateUserRole);
userRouter.delete("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
