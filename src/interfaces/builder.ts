export interface IBuilder<T> {
  build(): T;

  reset(): IBuilder<T>;
}
