import Redis from "ioredis"


const redisUrl = process.env.REDIS_URL;

const redis = new Redis(redisUrl)

redis.on("connect", () => {
    console.log("redis connected");
})

redis.on("error", (err) => {
    console.error("Redis connection error:", err.message);
})

export default redis