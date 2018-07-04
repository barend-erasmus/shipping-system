import { expect } from 'chai';
import * as sinon from 'sinon';
import { OrderPlacedEmailBuilder } from '../../src/builders/order-placed-email-builder';
import { OrderPlacedCommand } from '../../src/commands/order-placed';
import { Order } from '../../src/entities/order';
import { OrderPlacedCommandHandler } from '../../src/handlers/order-placed-command';
import { ICommandHandler } from '../../src/interfaces/command-handler';
import { IEmailGateway } from '../../src/interfaces/email-gateway';
import { Account } from '../../src/value-objects/account';
import { Dimensions } from '../../src/value-objects/dimensions';
import { Location } from '../../src/value-objects/location';

describe('OrderPlacedCommandHandler', () => {

    describe('#handle', () => {

        it('Should call email gateway with client email address', async () => {
            const emailGateway: IEmailGateway = {
                send: (body: string, from: string, subject: string, to: string) => {

                },
            } as IEmailGateway;

            const orderPlacedEmailBuilder: OrderPlacedEmailBuilder = new OrderPlacedEmailBuilder();

            const orderPlacedCommandHandler: ICommandHandler = new OrderPlacedCommandHandler(emailGateway, orderPlacedEmailBuilder);

            const emailGatewaySendSpy: sinon.SinonSpy = sinon.spy(emailGateway, 'send');

            await orderPlacedCommandHandler.handle(new OrderPlacedCommand(
                null,
                new Order(
                    null,
                    new Account('accountNumber',
                        'emailAddress',
                        'name',
                    ),
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
                )));

            expect(emailGatewaySendSpy.calledOnce).to.be.true;
            expect(emailGatewaySendSpy.args[0][3]).to.be.eq('emailAddress');
        });

    });

});
