import { Order } from '../entities/order';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IOrdersService } from '../interfaces/orders-service';

export class OrdersService implements IOrdersService {

    constructor(
        protected orderPlacedCommandBusClient: ICommandBusClient,
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
        return order;
    }

    public async decline(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

}
