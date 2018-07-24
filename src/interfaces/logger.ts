export abstract class ILogger {
  public debug(message: string, meta: any): void {
    this.log('debug', message, meta);
  }

  public error(message: string, meta: any): void {
    this.log('error', message, meta);
  }

  public info(message: string, meta: any): void {
    this.log('info', message, meta);
  }

  public warning(message: string, meta: any): void {
    this.log('warning', message, meta);
  }

  protected abstract log(level: string, message: string, meta: any): void;
}
