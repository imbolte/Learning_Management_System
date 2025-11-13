import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error";
import userRouter from "./routes/user_route";

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));

// routes
app.use("/api", userRouter);

// testing api 
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Test route is working properly!"
    });
});

// unknown route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(errorMiddleware);