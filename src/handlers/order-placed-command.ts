import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderPlacedEmailBuilder } from '../builders/order-placed-email-builder';
import { OrderPlacedCommand } from '../commands/order-placed';
import { configuration } from '../configuration';
import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';
import { IRepository } from '../interfaces/repository';

@injectable()
export class OrderPlacedCommandHandler implements ICommandHandler {

    constructor(
        @inject('AgentsRepository')
        protected agentsRepository: IRepository<Agent, string>,
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderPlacedEmailBuilder')
        protected orderPlacedEmailBuilder: OrderPlacedEmailBuilder,
    ) {

    }

    public async handle(command: ICommand): Promise<void> {
        const orderPlacedCommand: OrderPlacedCommand = command as OrderPlacedCommand;

        await this.sendEmailToClient(orderPlacedCommand.order);

        await this.sendEmailToAgents(orderPlacedCommand.order);
    }

    protected async sendEmailToAgents(order: Order): Promise<void> {
        const bodyForAgent: string = this.orderPlacedEmailBuilder
            .reset()
            .setOrder(order)
            .setToAgent()
            .setURL(configuration.url)
            .build();

        const agents: Agent[] = await this.agentsRepository.findAll();

        for (const agent of (agents as any)) {
            await this.emailGateway.send(bodyForAgent, 'shipping-system@example.com', 'Order Placed at Shipping System', agent.emailAddress);
        }
    }

    protected async sendEmailToClient(order: Order): Promise<void> {
        const bodyForClient: string = this.orderPlacedEmailBuilder
            .reset()
            .setOrder(order)
            .setToClient()
            .setURL(configuration.url)
            .build();

        await this.emailGateway.send(bodyForClient, 'shipping-system@example.com', 'Order Placed at Shipping System', order.account.emailAddress);
    }

}
