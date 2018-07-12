import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderApprovedFailedEmailBuilder } from '../builders/order-approved-failed-email';
import { OrderApprovedFailedCommand } from '../commands/order-approved-failed';
import { Agent } from '../entities/agent';
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
        const orderApprovedFailedCommand: OrderApprovedFailedCommand = command as OrderApprovedFailedCommand;

        await this.sendEmailToAgent(orderApprovedFailedCommand.agent, orderApprovedFailedCommand.order);
    }

    protected async sendEmailToAgent(agent: Agent, order: Order): Promise<void> {
        const bodyForClient: string = this.orderApprovedFailedEmailBuilder
            .reset()
            .setOrder(order)
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Approval Failed at Shipping System', agent.emailAddress);
    }

}
