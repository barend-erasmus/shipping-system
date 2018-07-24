import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderApprovedEmailBuilder } from '../builders/order-approved-email';
import { OrderApprovedCommand } from '../commands/order-approved';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderApprovedCommandHandler implements ICommandHandler {
  constructor(
    @inject('IEmailGateway') protected emailGateway: IEmailGateway,
    @inject('OrderApprovedEmailBuilder') protected orderApprovedEmailBuilder: OrderApprovedEmailBuilder,
  ) {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    const orderApprovedCommand: OrderApprovedCommand = command as OrderApprovedCommand;

    await this.sendEmailToClient(orderApprovedCommand.order);

    await this.sendEmailToAgent(orderApprovedCommand.order);
  }

  protected async sendEmailToAgent(order: Order): Promise<void> {
    const bodyForClient: string = this.orderApprovedEmailBuilder
      .reset()
      .setEmailAddress(order.account.emailAddress)
      .setOrder(order)
      .setToAgent()
      .setURL(configuration.url)
      .build();

    await this.emailGateway.send(
      bodyForClient,
      'shipping-system@example.com',
      'Order Approved at Shipping System',
      order.agent.emailAddress,
    );
  }

  protected async sendEmailToClient(order: Order): Promise<void> {
    const bodyForClient: string = this.orderApprovedEmailBuilder
      .reset()
      .setEmailAddress(order.account.emailAddress)
      .setOrder(order)
      .setToClient()
      .setURL(configuration.url)
      .build();

    await this.emailGateway.send(
      bodyForClient,
      'shipping-system@example.com',
      'Order Approved at Shipping System',
      order.account.emailAddress,
    );
  }
}
