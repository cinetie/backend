import Ioredis from "ioredis";

const redis = new Ioredis();

export const get = async (key) => {
  const result = await redis.get(key);
  return JSON.parse(result);
};

export const set = async (key, value) => {
  const result = await redis.setex(key, 86400, JSON.stringify(value));
  return result;
};
