import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderConfirmedEmailBuilder } from '../builders/order-confirmed-email';
import { OrderConfirmedCommand } from '../commands/order-confirmed';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderConfirmedCommandHandler implements ICommandHandler {
  constructor(
    @inject('IEmailGateway') protected emailGateway: IEmailGateway,
    @inject('OrderConfirmedEmailBuilder') protected orderConfirmedEmailBuilder: OrderConfirmedEmailBuilder,
  ) {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    const orderConfirmedCommand: OrderConfirmedCommand = command as OrderConfirmedCommand;

    await this.sendEmailToClient(orderConfirmedCommand.order);

    await this.sendEmailToAgent(orderConfirmedCommand.order);
  }

  protected async sendEmailToAgent(order: Order): Promise<void> {
    this.orderConfirmedEmailBuilder = this.orderConfirmedEmailBuilder
      .reset()
      .setEmailAddress(order.agent.emailAddress)
      .setOrder(order)
      .setToAgent()
      .setURL(configuration.url);

    const bodyForAgent: string = this.orderConfirmedEmailBuilder.build();

    await this.emailGateway.send(
      bodyForAgent,
      'shipping-system@example.com',
      'Order Confirmed at Shipping System',
      order.agent.emailAddress,
    );
  }

  protected async sendEmailToClient(order: Order): Promise<void> {
    const bodyForClient: string = this.orderConfirmedEmailBuilder
      .reset()
      .setEmailAddress(order.account.emailAddress)
      .setOrder(order)
      .setToClient()
      .setURL(configuration.url)
      .build();

    await this.emailGateway.send(
      bodyForClient,
      'shipping-system@example.com',
      'Order Confirmed at Shipping System',
      order.account.emailAddress,
    );
  }
}
