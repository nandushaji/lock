import { Injectable, Logger } from "@nestjs/common";
import { ILock } from "./ILock";
import { RedisCache } from "./RedisCache";

// Simple lock mechanism.
// For each key setting true for locked resource.
// Deleting key once released.
@Injectable()
export class RedisLock extends RedisCache<boolean> implements ILock {
  private readonly logger: Logger = new Logger(RedisLock.name);
  public async aquire(key: string, expiryInSeconds?: number): Promise<void> {
    const isLocked = await this.get(key);
    if (isLocked) {
      this.logger.error(
        `Error while aquiring lock for resource '${JSON.stringify(key)}'.`
      );
      throw Error(
        `Conflicting lock aquire for resource '${JSON.stringify(key)}'.`
      );
    }
    await this.put(key, true);
    if (expiryInSeconds) {
      await this.setExpiry(key, expiryInSeconds);
    }
    this.logger.log(
      `Lock aquired for resource '${JSON.stringify(key)}' ${
        expiryInSeconds ? `expires in '${expiryInSeconds}' seconds.` : ``
      }`
    );
  }

  public async release(key: string): Promise<void> {
    this.logger.log(`Lock released for resource '${JSON.stringify(key)}'`);
    return this.delete(key);
  }
}
