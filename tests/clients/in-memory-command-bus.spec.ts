import { expect } from 'chai';
import * as sinon from 'sinon';
import { InMemoryCommandBusClient } from '../../src/clients/in-memory-command-bus';
import { ICommand } from '../../src/interfaces/command';
import { ICommandBusClient } from '../../src/interfaces/command-bus-client';
import { ICommandHandler } from '../../src/interfaces/command-handler';

describe('InMemoryCommandBusClient', () => {
  describe('#execute', () => {
    it('Should call registered command handler', async () => {
      const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

      const commandHandler: ICommandHandler = {
        handle: async (command: ICommand) => {},
      } as ICommandHandler;

      const commandHandlerHandleSpy: sinon.SinonSpy = sinon.spy(commandHandler, 'handle');

      await commandBusClient.register(commandHandler);

      commandBusClient.execute({} as ICommand);

      expect(commandHandlerHandleSpy.calledOnce).to.be.true;
    });

    it('Should not call registered command handler given null', async () => {
      const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

      const commandHandler: ICommandHandler = {
        handle: async (command: ICommand) => {},
      } as ICommandHandler;

      const commandHandlerHandleSpy: sinon.SinonSpy = sinon.spy(commandHandler, 'handle');

      await commandBusClient.register(commandHandler);

      commandBusClient.execute(null);

      expect(commandHandlerHandleSpy.notCalled).to.be.true;
    });

    it('Should throw error given no command handler is registered', async () => {
      const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

      try {
        await commandBusClient.execute({} as ICommand);

        throw new Error('Expected Error');
      } catch {}
    });
  });

  describe('#register', () => {
    it('Should throw error given command handler is already registered', async () => {
      const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

      const commandHandler: ICommandHandler = {} as ICommandHandler;

      await commandBusClient.register(commandHandler);

      try {
        await commandBusClient.register(commandHandler);

        throw new Error('Expected Error');
      } catch {}
    });
  });
});
