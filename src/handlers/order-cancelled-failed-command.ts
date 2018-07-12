import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderCancelledFailedEmailBuilder } from '../builders/order-cancelled-failed-email';
import { OrderCancelledFailedCommand } from '../commands/order-cancelled-failed';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderCancelledFailedCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderCancelledFailedEmailBuilder')
        protected orderCancelledFailedEmailBuilder: OrderCancelledFailedEmailBuilder,
    ) {

    }

    // TODO: Unit Tests
    public async handle(command: ICommand): Promise<void> {
        const orderCancelledFailedCommand: OrderCancelledFailedCommand = command as OrderCancelledFailedCommand;

        await this.sendEmailToClient(orderCancelledFailedCommand.order);
    }

    protected async sendEmailToClient(order: Order): Promise<void> {
        const bodyForClient: string = this.orderCancelledFailedEmailBuilder
            .reset()
            .setOrder(order)
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Cancellation Failed at Shipping System', order.account.emailAddress);
    }

}
