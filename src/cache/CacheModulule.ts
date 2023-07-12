import { Inject, Module, OnModuleDestroy } from "@nestjs/common";
import { RedisLock } from "./RedisLock";
import { RedisModuleOptions } from "./ICache";
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from "./CacheModuleDefenition";
import { RedisCache } from "./RedisCache";

@Module({
  providers: [
    {
      provide: RedisLock,
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: RedisModuleOptions) =>
        new RedisLock(options.client),
    },
    {
      provide: RedisCache,
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: RedisModuleOptions) =>
        new RedisCache(options.client),
    },
  ],
  exports: [RedisLock, RedisCache],
})
export class LockModule
  extends ConfigurableModuleClass
  implements OnModuleDestroy
{
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: RedisModuleOptions
  ) {
    super();
  }

  public async onModuleDestroy(): Promise<void> {
    switch (this.options.client.status) {
      case "end":
        break;
      case "ready":
        await this.options.client.quit();
        break;
      default:
        this.options.client.disconnect();
        break;
    }
  }
}
