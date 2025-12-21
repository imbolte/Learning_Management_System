import { Response } from "express";
import CourseModel from "../models/course_model";
import { redis } from "../utils/redis";

// Create Course
export const createCourse = async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    await redis.del("allCourses"); // Clear all courses cache
    res.status(201).json({
        success: true,
        course
    });
};

// Get All Courses
export const getAllCoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        courses
    });
};
