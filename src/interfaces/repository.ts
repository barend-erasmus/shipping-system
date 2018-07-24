export interface IRepository<T, K> {
  find(id: K): Promise<T>;

  findAll(): Promise<T[]>;
}
