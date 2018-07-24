import { ICommand } from '../interfaces/command';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { ICommandHandler } from '../interfaces/command-handler';

export class InMemoryCommandBusClient implements ICommandBusClient {
  protected commandHandler: ICommandHandler = null;

  constructor() {}

  public async execute(command: ICommand): Promise<void> {
    if (!command) {
      return;
    }

    if (!this.commandHandler) {
      throw new Error('Command Handler not registered');
    }

    await this.commandHandler.handle(command);
  }

  public async register(commandHandler: ICommandHandler): Promise<void> {
    if (this.commandHandler) {
      throw new Error('Command Handler already registered');
    }

    this.commandHandler = commandHandler;
  }
}
