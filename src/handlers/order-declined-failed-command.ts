import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderApprovedFailedEmailBuilder } from '../builders/order-approved-failed-email';
import { OrderDeclinedFailedEmailBuilder } from '../builders/order-declined-failed-email';
import { OrderDeclinedFailedCommand } from '../commands/order-declined-failed';
import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderDeclinedFailedCommandHandler implements ICommandHandler {
  constructor(
    @inject('IEmailGateway') protected emailGateway: IEmailGateway,
    @inject('OrderDeclinedFailedEmailBuilder')
    protected orderDeclinedFailedEmailBuilder: OrderDeclinedFailedEmailBuilder,
  ) {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    const orderDeclinedFailedCommand: OrderDeclinedFailedCommand = command as OrderDeclinedFailedCommand;

    await this.sendEmailToAgent(orderDeclinedFailedCommand.agent, orderDeclinedFailedCommand.order);
  }

  protected async sendEmailToAgent(agent: Agent, order: Order): Promise<void> {
    const bodyForClient: string = this.orderDeclinedFailedEmailBuilder
      .reset()
      .setOrder(order)
      .build();

    await this.emailGateway.send(
      bodyForClient,
      'shipping-system@example.com',
      'Failed to Decline Order at Shipping System',
      agent.emailAddress,
    );
  }
}
