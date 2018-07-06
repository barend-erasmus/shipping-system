import { IRepository } from './repository';

export interface IWritableRepository<T, K> extends IRepository<T, K> {

    insert(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

}
