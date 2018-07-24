import { ICommand } from './command';
import { ICommandHandler } from './command-handler';

export interface ICommandBusClient {
  execute(command: ICommand): Promise<void>;

  register(commandHandler: ICommandHandler): Promise<void>;
}
