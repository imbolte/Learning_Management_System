import express from "express";

// import { registrationUser } from "../middleware/controllers/user_controller";

import { registrationUser, activateUser, loginUser, logoutUser } from "../middleware/controllers/user_controller";


const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

export default userRouter;




