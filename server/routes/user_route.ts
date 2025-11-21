// import express from "express";

// // import { registrationUser } from "../middleware/controllers/user_controller";

// import { registrationUser, activateUser, loginUser, logoutUser, updateAccessToken } from "../middleware/controllers/user_controller";
// import { authorizeRoles, isAuthenticated } from "../middleware/auth";


// const userRouter = express.Router();

// userRouter.post('/registration', registrationUser);
// userRouter.post('/activate-user', activateUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/logout',isAuthenticated , logoutUser);
// userRouter.get('/refresh', updateAccessToken);


// export default userRouter;




import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
} from "../middleware/controllers/user_controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);

// ➜ This is the endpoint your frontend calls: GET /api/me
userRouter.get("/me", isAuthenticated, getUserInfo);

export default userRouter;
