import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DeclineOrderCommand } from '../commands/decline-order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IOrdersService } from '../interfaces/orders-service';

@injectable()
export class DeclineOrderCommandHandler implements ICommandHandler {

    constructor(
        @inject('IOrdersService')
        protected ordersService: IOrdersService,
    ) {

    }

    // TODO: Unit Tests
    public async handle(command: ICommand): Promise<void> {
        const declineOrderCommand: DeclineOrderCommand = command as DeclineOrderCommand;

        await this.ordersService.decline(declineOrderCommand.orderId);
    }

}
