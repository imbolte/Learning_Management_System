// import {Redis} from "ioredis";

// require('dotenv').config();

// const redisClient = () =>{
//     if(process.env.REDIS_URL){
//         console.log(`Redis connected`);
//         return process.env.REDIS_URL;
//     }
//     throw new Error('Redis connection failed');
// }

// export const redis = new Redis(redisClient());

// import Redis from "ioredis";
// import dotenv from "dotenv";
// dotenv.config();

// // Function to get Redis URL and ensure it exists
// const getRedisURL = (): string => {
//   if (process.env.REDIS_URL) {
//     console.log("Redis URL found, connecting...");
//     return process.env.REDIS_URL;
//   }
//   throw new Error("Redis connection failed: REDIS_URL not set");
// };

// // Single Redis instance
// export const redis = new Redis(getRedisURL());
// redis.on("connect", () => console.log("Redis connected successfully"));
// redis.on("error", (err) => console.error("Redis error:", err));

import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// Create Redis client
const redis = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: 0, // Prevent endless retry loops
  retryStrategy: () => null, // Disable auto-retry
  enableReadyCheck: true, // Optional: ensures stable connection
});

// On connect
redis.on("connect", () => {
  console.log("Redis connected");
});

// On error
redis.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

// On end
redis.on("end", () => {
  console.log("Redis connection closed.");
});

export default redis;
