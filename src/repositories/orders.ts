import { injectable } from 'inversify';
import { Order } from '../entities/order';
import { IWritableRepository } from '../interfaces/writable-repository';

@injectable()
export class OrderRepository implements IWritableRepository<Order, string> {

    public async find(id: string): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async findAll(): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }

    public async insert(entity: Order): Promise<Order> {
        // TODO

        return entity;
    }

}
