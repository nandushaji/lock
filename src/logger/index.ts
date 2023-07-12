import { WinstonModule } from "nest-winston";
import winston, { format, level } from "winston";

const isLocal = process.env.NODE_ENV;
const logFormat = format.printf(
  (info) =>
    `${info.timestamp} ${info.level}: [${info.context}]: ${info.message}`
);

export default WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: isLocal ? "info" : "debug",
      format: isLocal
        ? format.combine(format.timestamp(), format.colorize(), logFormat)
        : format.combine(format.timestamp(), format.json()),
    }),
  ],
});
