import { ConfigurableModuleBuilder } from "@nestjs/common";
import { RedisModuleOptions } from "./ICache";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RedisModuleOptions>().build();
