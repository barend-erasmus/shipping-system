import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderApprovedEmailBuilder } from '../builders/order-approved-email';
import { OrderApprovedFailedEmailBuilder } from '../builders/order-approved-failed-email';
import { OrderApprovedCommand } from '../commands/order-approved';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderApprovedFailedCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderApprovedFailedEmailBuilder')
        protected orderApprovedFailedEmailBuilder: OrderApprovedFailedEmailBuilder,
    ) {

    }

    // TODO: Unit Tests
    public async handle(command: ICommand): Promise<void> {
        // const orderApprovedCommand: OrderApprovedCommand = command as OrderApprovedCommand;

        // await this.sendEmailToAgent(orderApprovedCommand.order);
    }

    // protected async sendEmailToAgent(order: Order): Promise<void> {
    //     const bodyForClient: string = this.orderApprovedFailedEmailBuilder
    //         .reset()
    //         .setOrder(order)
    //         .build();

    //     await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Approved at Shipping System', order.agent.emailAddress);
    // }

}
