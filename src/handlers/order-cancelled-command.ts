import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderCancelledEmailBuilder } from '../builders/order-cancelled-email';
import { OrderCancelledCommand } from '../commands/order-cancelled';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderCancelledCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderCancelledEmailBuilder')
        protected orderCancelledEmailBuilder: OrderCancelledEmailBuilder,
    ) {

    }

    // TODO: Unit Tests
    public async handle(command: ICommand): Promise<void> {
        const orderCancelledCommand: OrderCancelledCommand = command as OrderCancelledCommand;

        await this.sendEmailToClient(orderCancelledCommand.order);

        await this.sendEmailToAgent(orderCancelledCommand.order);
    }

    protected async sendEmailToAgent(order: Order): Promise<void> {
        const bodyForClient: string = this.orderCancelledEmailBuilder
            .reset()
            .setOrder(order)
            .setToAgent()
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Cancelled at Shipping System', order.agent.emailAddress);
    }

    protected async sendEmailToClient(order: Order): Promise<void> {
        const bodyForClient: string = this.orderCancelledEmailBuilder
            .reset()
            .setOrder(order)
            .setToClient()
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Cancelled at Shipping System', order.account.emailAddress);
    }

}
