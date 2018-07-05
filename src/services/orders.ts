import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { OrderPlacedCommand } from '../commands/order-placed';
import { Order } from '../entities/order';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IOrdersService } from '../interfaces/orders-service';
import { IWritableRepository } from '../interfaces/writable-repository';

@injectable()
export class OrdersService implements IOrdersService {

    constructor(
        @inject('OrderPlacedCommandBusClient')
        protected orderPlacedCommandBusClient: ICommandBusClient,
        @inject('IOrdersRepository')
        protected orderRepository: IWritableRepository<Order, string>,
    ) {

    }

    public async approve(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async cancel(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async confrim(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async create(order: Order): Promise<Order> {
        // TODO: Validation
        order = await this.orderRepository.insert(order);

        await this.orderPlacedCommandBusClient.execute(new OrderPlacedCommand(uuid.v4(), order));

        return order;
    }

    public async decline(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

}
