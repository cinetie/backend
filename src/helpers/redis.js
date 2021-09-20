import Ioredis from "ioredis";

const redis = new Ioredis();

export const get = async (key) => {
  const result = await redis.get(key);
  return result ? JSON.parse(result): null;
};

export const set = async (key, value) => {
  const result = await redis.setex(key, 86400, JSON.stringify(value));
  return result;
};
