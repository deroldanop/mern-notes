import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

//create a ratelimiter that allows 10 request per 20sec.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;

// import { Redis } from "@upstash/redis";
// const redis = new Redis({
//   url: "https://notable-goat-65328.upstash.io",
//   token: "********",
// });

// await redis.set("foo", "bar");
// await redis.get("foo");
