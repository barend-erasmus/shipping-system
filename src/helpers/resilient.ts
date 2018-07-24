export class ResilientHelper {
  // TODO: Unit Tests
  public static async retry<T>(count: number, fn: () => Promise<T>): Promise<T> {
    try {
      const result: T = await fn();

      return result;
    } catch (error) {
      if (count > 0) {
        ResilientHelper.retry(count - 1, fn);
      }

      throw error;
    }
  }
}
