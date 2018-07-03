import { inject, injectable } from 'inversify';
import { PlaceOrderCommand } from '../commands/place-order';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IOrdersService } from '../interfaces/orders-service';

@injectable()
export class PlaceOrderCommandHandler implements ICommandHandler {

    constructor(
        @inject('IOrdersService')
        protected ordersService: IOrdersService,
    ) {

    }

    public async handle(command: ICommand): Promise<void> {
        const placeOrderCommnad: PlaceOrderCommand = command as PlaceOrderCommand;

        await this.ordersService.create(placeOrderCommnad.order);
    }

}
