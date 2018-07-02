import { Order } from '../entities/order';
import { IWritableRepository } from '../interfaces/writable-repository';

export class OrderRepository implements IWritableRepository<Order, string> {

    public async find(id: string): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async findAll(): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }

    public async insert(entity: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

}
