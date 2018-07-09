import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CancelOrderCommand } from '../commands/cancel-order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IOrdersService } from '../interfaces/orders-service';

@injectable()
export class CancelOrderCommandHandler implements ICommandHandler {

    constructor(
        @inject('IOrdersService')
        protected ordersService: IOrdersService,
    ) {

    }

    // TODO: Unit Tests
    public async handle(command: ICommand): Promise<void> {
        const cancelOrderCommand: CancelOrderCommand = command as CancelOrderCommand;

        await this.ordersService.cancel(cancelOrderCommand.orderId);
    }

}
