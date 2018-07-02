import { ICommand } from './command';

export interface ICommandHandler {

    handle(command: ICommand): Promise<void>;

}
