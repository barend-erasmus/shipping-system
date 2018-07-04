import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderPlacedEmailBuilder } from '../builders/order-placed-email-builder';
import { OrderPlacedCommand } from '../commands/order-placed';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderPlacedCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderPlacedEmailBuilder')
        protected orderPlacedEmailBuilder: OrderPlacedEmailBuilder,
    ) {

    }

    public async handle(command: ICommand): Promise<void> {
        const orderPlacedCommand: OrderPlacedCommand = command as OrderPlacedCommand;

        await this.sendEmailToClient(orderPlacedCommand.order);

        // TODO: Send emails to agents.
    }

    protected async sendEmailToClient(order: Order): Promise<void> {
        const bodyForClient: string = this.orderPlacedEmailBuilder
            .reset()
            .setOrder(order)
            .setToClient()
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Placed at Shipping System', order.account.emailAddress);
    }

}
