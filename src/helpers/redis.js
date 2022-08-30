import Ioredis from "ioredis";
import env from "../config/env";

const host = env.NODE_ENV === "staging" ? env.REDIS_HOST : "127.0.0.1";
const port = env.NODE_ENV === "staging" ? env.REDIS_PORT : "6379";
const username = env.NODE_ENV === "staging" ? env.REDIS_USERNAME : "default";
const password = env.NODE_ENV === "staging" ? env.REDIS_PASSWORD : "";

const redis = new Ioredis({
  port,
  username,
  password,
  host,
});

export const get = async (key) => {
  console.log(key);
  const result = await redis.get(key);
  return result ? JSON.parse(result): null;
};

export const set = async (key, value, exp) => {
  const result = await redis.setex(key, exp || 86400, JSON.stringify(value));
  return result;
};
