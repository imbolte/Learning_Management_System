import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const dbUri: string = process.env.DB_URI || "";

const connectDB = async (): Promise<void> => {
    if (!dbUri) {
        console.error(" DB_URI is not defined in .env");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(dbUri);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        console.log("Retrying in 5 seconds...");
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};

export default connectDB;
