import { inject, injectable } from 'inversify';
import { OrderPlacedEmailBuilder } from '../builders/order-placed-email-builder';
import { OrderPlacedCommand } from '../commands/order-placed';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderPlacedCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
        @inject('OrderPlacedEmailBuilder')
        protected orderPlacedEmailBuilder: OrderPlacedEmailBuilder,
    ) {

    }

    public async handle(command: ICommand): Promise<void> {
        const orderPlacedCommand: OrderPlacedCommand = command as OrderPlacedCommand;

        const body: string = this.orderPlacedEmailBuilder
            .reset()
            .setOrder(orderPlacedCommand.order)
            .build();

        await this.emailGateway.send(body, 'developersworkspace@gmail.com', 'Order Placed at Shipping System', 'developersworkspace@gmail.com');
    }

}
