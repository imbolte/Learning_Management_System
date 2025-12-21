import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../catchAsyncErrors";
import ErrorHandler from "../../utils/ErrorHandler";
import OrderModel, { IOrder } from "../../models/order_model";
import userModel from "../../models/user_model";
import CourseModel, { ICourse } from "../../models/course_model";
import path from "path";
import ejs from "ejs";
import sendMail from "../../utils/sendMail";
import redis from "../../utils/redis";
require("dotenv").config();
const stripe = process.env.STRIPE_SECRET_KEY
    ? require("stripe")(process.env.STRIPE_SECRET_KEY)
    : null;

// create order
export const createOrder = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { courseId, payment_info } = req.body as IOrder;

            if (payment_info) {
                if ("id" in payment_info) {
                    const paymentIntentId = (payment_info as any).id;
                    const paymentIntent = await stripe.paymentIntents.retrieve(
                        paymentIntentId
                    );

                    if (paymentIntent.status !== "succeeded") {
                        return next(new ErrorHandler("Payment not authorized!", 400));
                    }
                }
            }

            const user = await userModel.findById(req.user?._id);

            const courseExistInUser = user?.courses.some(
                (item: any) => item._id.toString() === courseId
            );

            if (courseExistInUser) {
                return next(
                    new ErrorHandler("You have already purchased this course", 400)
                );
            }

            const course: ICourse | null = await CourseModel.findById(courseId);

            if (!course) {
                return next(new ErrorHandler("Course not found", 404));
            }

            const data: any = {
                courseId: course._id,
                userId: user?._id,
                payment_info,
            };

            const mailData = {
                order: {
                    _id: course._id.toString().slice(0, 6),
                    name: course.name,
                    price: course.price,
                    date: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                },
            };

            try {
                if (user) {
                    await sendMail({
                        email: user.email,
                        subject: "Order Confirmation",
                        template: "order-confirmation.ejs",
                        data: mailData,
                    });
                }
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 500));
            }

            user?.courses.push(course?._id as any);

            await redis.set(req.user?._id as any, JSON.stringify(user));

            await user?.save();

            course.purchased = (course.purchased || 0) + 1;

            await course.save();

            const newOrder = await OrderModel.create(data);

            res.status(201).json({
                success: true,
                order: newOrder,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
    async (req: Request, res: Response) => {
        res.status(200).json({
            publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    }
);

// new payment
export const newPayment = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const myPayment = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "USD",
                metadata: {
                    company: "E-Learning",
                },
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(201).json({
                success: true,
                client_secret: myPayment.client_secret,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// get user orders
export const getUserOrders = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await OrderModel.find({ userId: req.user?._id }).populate("courseId").sort({
                createdAt: -1,
            });

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
