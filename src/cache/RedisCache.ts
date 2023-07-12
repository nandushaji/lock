import { Redis } from "ioredis";
import { ICache } from "./ICache";
import { isNullOrUndefined } from "../utils/common.util";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisCache<T> implements ICache<T> {
  constructor(protected readonly redisClient: Redis) {}
  public async get(key: string): Promise<T> {
    return this._get(await this._getKey(key));
  }

  public async put(key: string, value: T): Promise<void> {
    return this._set(await this._getKey(key), value);
  }

  public async setExpiry(key: string, expiryInSeconds: number): Promise<void> {
    await this.redisClient.expire(await this._getKey(key), expiryInSeconds);
  }

  public async delete(key: string): Promise<void> {
    return this._delete(key);
  }

  private async _getKey(key: string): Promise<string> {
    return key;
  }

  private async _delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  private async _set(key: string, value: T): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  private async _get(key: string): Promise<T> {
    const value = await this.redisClient.get(key);
    return !isNullOrUndefined(value) ? (JSON.parse(value) as T) : null;
  }
}
