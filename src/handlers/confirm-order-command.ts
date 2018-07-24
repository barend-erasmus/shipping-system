import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ConfirmOrderCommand } from '../commands/confirm-order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IOrdersService } from '../interfaces/orders-service';

@injectable()
export class ConfirmOrderCommandHandler implements ICommandHandler {
  constructor(@inject('IOrdersService') protected ordersService: IOrdersService) {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    const confirmOrderCommand: ConfirmOrderCommand = command as ConfirmOrderCommand;

    await this.ordersService.confirm(confirmOrderCommand.orderId);
  }
}
