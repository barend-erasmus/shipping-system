import { injectable } from 'inversify';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';

@injectable()
export class PlaceOrderCommandHandler implements ICommandHandler {

    public async handle(command: ICommand): Promise<void> {

    }

}
