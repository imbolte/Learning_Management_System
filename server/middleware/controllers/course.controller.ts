import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../catchAsyncErrors";
import ErrorHandler from "../../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../../services/course.service";
import CourseModel from "../../models/course_model";
import redis from "../../utils/redis";
import axios from "axios";

// Upload Course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        await createCourse(data, res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Edit Course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        const courseData = await CourseModel.findById(courseId) as any;

        if (!courseData) {
            return next(new ErrorHandler("Course not found", 404));
        }

        if (thumbnail && !thumbnail.startsWith("http")) {
            if (courseData.thumbnail?.public_id) {
                await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        if (thumbnail && thumbnail.startsWith("http")) {
            data.thumbnail = {
                public_id: courseData?.thumbnail?.public_id,
                url: courseData?.thumbnail?.url
            }
        }

        const course = await CourseModel.findByIdAndUpdate(courseId, { $set: data }, { new: true });

        // Clear Redis cache
        await redis.del("allCourses"); // Clear all courses cache
        await redis.set(courseId, JSON.stringify(course)); // Update specific course cache

        res.status(201).json({
            success: true,
            course
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get Single Course - without purchasing
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const isCacheExist = await redis.get(courseId);

        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course
            });
        } else {
            const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7 days
            res.status(200).json({
                success: true,
                course
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get All Courses - without purchasing
export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCacheExist = await redis.get("allCourses");
        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                courses
            });
        } else {
            const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis.set("allCourses", JSON.stringify(courses));
            res.status(200).json({
                success: true,
                courses
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get Course Content - valid user
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId);

        if (!courseExists) {
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }
        const course = await CourseModel.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Get All Courses - Admin
export const getAdminAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllCoursesService(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Delete Course
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findById(id);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        if (course.thumbnail?.public_id) {
            await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
        }

        await course.deleteOne();
        await redis.del(id);
        await redis.del("allCourses"); // Clear all courses cache

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


// Generate Video OTP
export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { videoId } = req.body;

        if (videoId && videoId.includes("vdocipher.com")) {
            // Handle various VdoCipher URL formats
            if (videoId.includes("video/")) {
                videoId = videoId.split("video/")[1].split("/")[0].split("?")[0];
            } else if (videoId.includes("id=")) {
                const urlParams = new URLSearchParams(videoId.split("?")[1]);
                videoId = urlParams.get("id");
            }
        }

        if (!videoId) {
            return next(new ErrorHandler("Video ID is required", 400));
        }
        console.log("Generating OTP for videoId:", videoId);

        if (!process.env.VDOCIPHER_API_SECRET) {
            console.error("VDOCIPHER_API_SECRET is not defined in .env");
            return next(new ErrorHandler("VdoCipher API secret is missing", 400));
        }

        const response = await axios.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            {
                ttl: 300,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`
                }
            });
        res.json(response.data);
    } catch (error: any) {
        console.error("VdoCipher Error:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message;
        return next(new ErrorHandler(errorMessage, 400));
    }
});
