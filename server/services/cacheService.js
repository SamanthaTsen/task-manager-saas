import redisClient from '../utils/redisClient.js';

export const setCache = async (key, value, ttl = 3600) => {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await redisClient.set(key, data, { EX: ttl });
  } catch (err) {
    console.error(`setCache error for ${key}:`, err.message);
  }
};

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  } catch (err) {
    console.error(`getCache error for ${key}:`, err.message);
    return null;
  }
};

export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error(`deleteCache error for ${key}:`, err.message);
  }
};
