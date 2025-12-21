import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { createOrder, getUserOrders, newPayment, sendStripePublishableKey } from "../middleware/controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

orderRouter.get("/get-user-orders", isAuthenticated, getUserOrders);

export default orderRouter;
