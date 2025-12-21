import dotenv from "dotenv";
dotenv.config();


import express, { Request, Response, NextFunction, Application } from "express";
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
// app.use(cors({
//     origin: process.env.ORIGIN
// }));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);


import courseRouter from "./routes/course.route";
import analyticsRouter from "./routes/analytics.route";
import orderRouter from "./routes/order.route";

// routes
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", analyticsRouter);
app.use("/api", orderRouter);

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