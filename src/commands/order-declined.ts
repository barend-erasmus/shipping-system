import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';

export class OrderDeclinedCommand implements ICommand {

    constructor(
        public id: string,
        public order: Order,
    ) {

    }

}
