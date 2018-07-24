import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { OrderPlacedFailedEmailBuilder } from '../builders/order-placed-failed-email';
import { OrderPlacedFailedCommand } from '../commands/order-placed-failed';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderPlacedCommandHandler implements ICommandHandler {
  constructor(
    @inject('IEmailGateway') protected emailGateway: IEmailGateway,
    @inject('OrderPlacedFailedEmailBuilder') protected orderPlacedFailedEmailBuilder: OrderPlacedFailedEmailBuilder,
  ) {}

  public async handle(command: ICommand): Promise<void> {
    const orderPlacedFailedCommand: OrderPlacedFailedCommand = command as OrderPlacedFailedCommand;

    await this.sendEmailToClient(orderPlacedFailedCommand.order);
  }

  protected async sendEmailToClient(order: Order): Promise<void> {
    const bodyForClient: string = this.orderPlacedFailedEmailBuilder
      .reset()
      .setOrder(order)
      .build();

    await this.emailGateway.send(
      bodyForClient,
      'shipping-system@example.com',
      'Failed to Place Order at Shipping System',
      order.account.emailAddress,
    );
  }
}
