import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { OrderPlacedCommand } from '../commands/order-placed';
import { Order } from '../entities/order';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IOrdersService } from '../interfaces/orders-service';
import { IValidator } from '../interfaces/validator';
import { IWritableRepository } from '../interfaces/writable-repository';

@injectable()
export class OrdersService implements IOrdersService {

    constructor(
        @inject('OrderPlacedCommandBusClient')
        protected orderPlacedCommandBusClient: ICommandBusClient,
        @inject('OrdersRepository')
        protected orderRepository: IWritableRepository<Order, string>,
        @inject('OrderValidator')
        protected orderValidator: IValidator<Order>,
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
        this.validateOrder(order);

        order = await this.orderRepository.insert(order);

        await this.orderPlacedCommandBusClient.execute(new OrderPlacedCommand(uuid.v4(), order));

        return order;
    }

    public async decline(order: Order): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    protected validateOrder(order: Order): void {
        const messages: string[] = this.orderValidator.getMessages(order);

        if (messages.length) {
            throw new Error(messages.join('\r\n'));
        }
    }

}
