## Quick Start

### 1. Import module

```ts
import { LockModule } from "redis-lock";
import Redis from "ioredis";

@Module({
  imports: [
    LockModule.register({
      client: new Redis({ host: "localhost" }),
      settings:{
        retryCount:5,
        retryDelay:100
      }
    }),
  ],
})
export class AppModule {}
```

### 2. Usage

```ts
import { RedisLock } from "redis-lock";

@Injectable()
export class ExampleService {
    constructor(){
        @Inject(RedisLock)
        private readonly lockService:RedisLock;
    }

    public async criticalMethod(id:string){
        await lockService.aquire(id);
        //Compelex process
        await lockService.release(id);
    }
  
}
```

This is complete. redis lock is working correctly!
