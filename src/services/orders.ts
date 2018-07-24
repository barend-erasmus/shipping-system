import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { OrderApprovedCommand } from '../commands/order-approved';
import { OrderApprovedFailedCommand } from '../commands/order-approved-failed';
import { OrderCancelledCommand } from '../commands/order-cancelled';
import { OrderCancelledFailedCommand } from '../commands/order-cancelled-failed';
import { OrderConfirmedCommand } from '../commands/order-confirmed';
import { OrderDeclinedCommand } from '../commands/order-declined';
import { OrderPlacedCommand } from '../commands/order-placed';
import { OrderPlacedFailedCommand } from '../commands/order-placed-failed';
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
        @inject('OrderApprovedFailedCommandBusClient')
        protected orderApprovedFailedCommandBusClient: ICommandBusClient,
        @inject('OrderCancelledCommandBusClient')
        protected orderCancelledCommandBusClient: ICommandBusClient,
        @inject('OrderCancelledFailedCommandBusClient')
        protected orderCancelledFailedCommandBusClient: ICommandBusClient,
        @inject('OrderConfirmedCommandBusClient')
        protected orderConfirmedCommandBusClient: ICommandBusClient,
        @inject('OrderDeclinedCommandBusClient')
        protected orderDeclinedCommandBusClient: ICommandBusClient,
        @inject('OrderPlacedCommandBusClient')
        protected orderPlacedCommandBusClient: ICommandBusClient,
        @inject('OrderPlacedFailedCommandBusClient')
        protected orderPlacedFailedCommandBusClient: ICommandBusClient,
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

        const agents: Agent[] = await this.agentsRepository
            .findAll();

        const agent: Agent = agents.find((x: Agent) => x.emailAddress === agentEmailAddress);

        try {
            order.setToApproved(agent);
        } catch (error) {
            await this.orderApprovedFailedCommandBusClient.execute(new OrderApprovedFailedCommand(uuid.v4(), agent, error.message, order));

            return null;
        }

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

        try {
            order.setToCancelled();
        } catch (error) {
            await this.orderCancelledFailedCommandBusClient.execute(new OrderCancelledFailedCommand(uuid.v4(), error.message, order));

            return null;
        }

        order = await this.orderRepository.update(order);

        await this.orderCancelledCommandBusClient.execute(new OrderCancelledCommand(uuid.v4(), order));

        return order;
    }

    // TODO: Unit Tests
    public async confirm(orderId: string): Promise<Order> {
        let order: Order = await this.orderRepository.find(orderId);

        if (!order) {
            return null;
        }

        try {
            order.setToConfirmed();
        } catch (error) {
            // TODO: Send Email
        }

        order = await this.orderRepository.update(order);

        await this.orderConfirmedCommandBusClient.execute(new OrderConfirmedCommand(uuid.v4(), order));

        return order;
    }

    public async create(order: Order): Promise<Order> {
        try {
            this.validateOrder(order);
        } catch (error) {
            this.orderPlacedFailedCommandBusClient.execute(new OrderPlacedFailedCommand(uuid.v4(), order));
            return order;
        }

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

        try {
            order.setToDeclined();
        } catch (error) {
            // TODO: Send Email
        }

        order = await this.orderRepository.update(order);

        await this.orderDeclinedCommandBusClient.execute(new OrderDeclinedCommand(uuid.v4(), order));

        return order;
    }

    protected validateOrder(order: Order): void {
        const messages: string[] = this.orderValidator.getMessages(order);

        if (messages.length) {
            throw new Error(messages.join('\r\n'));
        }
    }

}
