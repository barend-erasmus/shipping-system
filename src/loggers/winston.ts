import * as winston from 'winston';
import { ILogger } from '../interfaces/logger';

export class WinstonLogger extends ILogger {
  constructor() {
    super();
  }

  protected log(level: string, message: string, meta: any): void {
    winston.log(level, message, meta);
  }
}
