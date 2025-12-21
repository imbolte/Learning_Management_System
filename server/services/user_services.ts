import { Response } from "express";
import redis from "../utils/redis";
import userModel from "../models/user_model";

// get user by id with database fallback
export const getUserById = async (id: string, res: Response) => {
    let userJson = await redis.get(id);

    if (!userJson) {
        const user = await userModel.findById(id);
        if (user) {
            userJson = JSON.stringify(user);
            await redis.set(id, userJson);
        }
    }

    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).json({
            success: true,
            user,
        });
    } else {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
};
