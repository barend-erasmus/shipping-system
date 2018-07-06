import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { OrderApprovedCommand } from '../commands/order-approved';
import { OrderPlacedCommand } from '../commands/order-placed';
import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IOrdersService } from '../interfaces/orders-service';
import { IRepository } from '../interfaces/repository';
import { IValidator } from '../interfaces/validator';
import { IWritableRepository } from '../interfaces/writable-repository';

@injectable()
export class OrdersService implements IOrdersService {

    constructor(
        @inject('AgentsRepository')
        protected agentsRepository: IRepository<Agent, string>,
        @inject('OrderApprovedCommandBusClient')
        protected orderApprovedCommandBusClient: ICommandBusClient,
        @inject('OrderCancelledCommandBusClient')
        protected orderCancelledCommandBusClient: ICommandBusClient,
        @inject('OrderConfirmedCommandBusClient')
        protected orderConfirmedCommandBusClient: ICommandBusClient,
        @inject('OrderDeclinedCommandBusClient')
        protected orderDeclinedCommandBusClient: ICommandBusClient,
        @inject('OrderPlacedCommandBusClient')
        protected orderPlacedCommandBusClient: ICommandBusClient,
        @inject('OrdersRepository')
        protected orderRepository: IWritableRepository<Order, string>,
        @inject('OrderValidator')
        protected orderValidator: IValidator<Order>,
    ) {

    }

    // TODO: Unit Tests
    public async approve(agentEmailAddress: string, orderId: string): Promise<Order> {
        let order: Order = await this.orderRepository.find(orderId);

        if (!order) {
            return null;
        }

        const agent: Agent = await this.agentsRepository.find(agentEmailAddress);

        order.setToApproved(agent);

        order = await this.orderRepository.update(order);

        await this.orderApprovedCommandBusClient.execute(new OrderApprovedCommand(uuid.v4(), order));

        return order;
    }

    // TODO: Unit Tests
    public async cancel(orderId: string): Promise<Order> {
        let order: Order = await this.orderRepository.find(orderId);

        if (!order) {
            return null;
        }

        order.setToCancelled();

        order = await this.orderRepository.update(order);

        await this.orderCancelledCommandBusClient.execute(new OrderApprovedCommand(uuid.v4(), order));

        return order;
    }

    // TODO: Unit Tests
    public async confrim(orderId: string): Promise<Order> {
        let order: Order = await this.orderRepository.find(orderId);

        if (!order) {
            return null;
        }

        order.setToConfirmed();

        order = await this.orderRepository.update(order);

        await this.orderConfirmedCommandBusClient.execute(new OrderApprovedCommand(uuid.v4(), order));

        return order;
    }

    public async create(order: Order): Promise<Order> {
        this.validateOrder(order);

        order = await this.orderRepository.insert(order);

        await this.orderPlacedCommandBusClient.execute(new OrderPlacedCommand(uuid.v4(), order));

        return order;
    }

    // TODO: Unit Tests
    public async decline(orderId: string): Promise<Order> {
        let order: Order = await this.orderRepository.find(orderId);

        if (!order) {
            return null;
        }

        order.setToDeclined();

        order = await this.orderRepository.update(order);

        await this.orderDeclinedCommandBusClient.execute(new OrderApprovedCommand(uuid.v4(), order));

        return order;
    }

    protected validateOrder(order: Order): void {
        const messages: string[] = this.orderValidator.getMessages(order);

        if (messages.length) {
            throw new Error(messages.join('\r\n'));
        }
    }

}
