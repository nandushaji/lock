import Redis from "ioredis";

export interface ICache<T> {
  get(key: string): Promise<T>;
  put(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  setExpiry(key: string, expiryInSeconds: number): Promise<void>;
}

export type RedisModuleOptions = {
  client: Redis;
  settings:{
    duration?: number;
    retryCount?: number;
    retryDelay?: number;
  }
};
