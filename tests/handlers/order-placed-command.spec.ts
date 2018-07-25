import { expect } from 'chai';
import * as sinon from 'sinon';
import { OrderPlacedEmailBuilder } from '../../src/builders/order-placed-email';
import { OrderPlacedCommand } from '../../src/commands/order-placed';
import { Agent } from '../../src/entities/agent';
import { Order } from '../../src/entities/order';
import { OrderPlacedCommandHandler } from '../../src/handlers/order-placed-command';
import { ICommandHandler } from '../../src/interfaces/command-handler';
import { IEmailGateway } from '../../src/interfaces/email-gateway';
import { IRepository } from '../../src/interfaces/repository';
import { Account } from '../../src/value-objects/account';
import { Dimensions } from '../../src/value-objects/dimensions';
import { Location } from '../../src/value-objects/location';

describe('OrderPlacedCommandHandler', () => {
  describe('#handle', () => {
    it('Should call email gateway with client email address', async () => {
      const agentsRepository: IRepository<Agent, string> = {
        findAll: async () => {
          return [];
        },
      } as IRepository<Agent, string>;

      const emailGateway: IEmailGateway = {
        send: (body: string, from: string, subject: string, to: string) => {},
      } as IEmailGateway;

      const orderPlacedEmailBuilder: OrderPlacedEmailBuilder = new OrderPlacedEmailBuilder();

      const orderPlacedCommandHandler: ICommandHandler = new OrderPlacedCommandHandler(
        agentsRepository,
        emailGateway,
        orderPlacedEmailBuilder,
      );

      const emailGatewaySendSpy: sinon.SinonSpy = sinon.spy(emailGateway, 'send');

      await orderPlacedCommandHandler.handle(
        new OrderPlacedCommand(
          null,
          new Order(
            null,
            new Account('accountNumber', 'emailAddress', 'name'),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            new Location(null, null, null, null),
            new Dimensions(null, null, null),
            new Location(null, null, null, null),
            null,
          ),
        ),
      );

      expect(emailGatewaySendSpy.calledOnce).to.be.true;
      expect(emailGatewaySendSpy.args[0][3]).to.be.eq('emailAddress');
    });

    it('Should call email gateway with agent email addresses', async () => {
      const agentsRepository: IRepository<Agent, string> = {
        findAll: async () => {
          return [new Agent(null, 'emailAddress-agent-1', null)];
        },
      } as IRepository<Agent, string>;

      const emailGateway: IEmailGateway = {
        send: (body: string, from: string, subject: string, to: string) => {},
      } as IEmailGateway;

      const orderPlacedEmailBuilder: OrderPlacedEmailBuilder = new OrderPlacedEmailBuilder();

      const orderPlacedCommandHandler: ICommandHandler = new OrderPlacedCommandHandler(
        agentsRepository,
        emailGateway,
        orderPlacedEmailBuilder,
      );

      const emailGatewaySendSpy: sinon.SinonSpy = sinon.spy(emailGateway, 'send');

      await orderPlacedCommandHandler.handle(
        new OrderPlacedCommand(
          null,
          new Order(
            null,
            new Account('accountNumber', 'emailAddress', 'name'),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            new Location(null, null, null, null),
            new Dimensions(null, null, null),
            new Location(null, null, null, null),
            null,
          ),
        ),
      );

      expect(emailGatewaySendSpy.callCount).to.be.eq(2);
      expect(emailGatewaySendSpy.args[1][3]).to.be.eq('emailAddress-agent-1');
    });
  });
});
