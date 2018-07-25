import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ApproveOrderCommand } from '../commands/approve-order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IOrdersService } from '../interfaces/orders-service';

@injectable()
export class ApproveOrderCommandHandler implements ICommandHandler {
  constructor(@inject('IOrdersService') protected ordersService: IOrdersService) {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    const approveOrderCommand: ApproveOrderCommand = command as ApproveOrderCommand;

    await this.ordersService.approve(approveOrderCommand.agentEmailAddress, approveOrderCommand.orderId);
  }
}
