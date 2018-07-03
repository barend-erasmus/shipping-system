import { inject, injectable } from 'inversify';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';
import { IEmailGateway } from '../interfaces/email-gateway';

@injectable()
export class OrderPlacedCommandHandler implements ICommandHandler {

    constructor(
        @inject('IEmailGateway')
        protected emailGateway: IEmailGateway,
    ) {

    }

    public async handle(command: ICommand): Promise<void> {
        await this.emailGateway.send(`Your order has been placed`, 'developersworkspace@gmail.com', 'Order Placed', 'developersworkspace@gmail.com');
    }

}
