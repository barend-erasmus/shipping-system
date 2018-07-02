import { expect } from 'chai';
import * as sinon from 'sinon';
import * as supertest from 'supertest';
import { app } from '../../src/app';
import { PlaceOrderCommand } from '../../src/commands/place-order';
import { ICommand } from '../../src/interfaces/command';
import { ICommandHandler } from '../../src/interfaces/command-handler';
import { getContainer, resetContainer } from './../../src/ioc';
import { IRepository } from '../../src/interfaces/repository';
import { Location } from '../../src/value-objects/location';

describe('OrdersRouter', () => {

    describe('#place', () => {

        beforeEach(() => {
            resetContainer();
        });

        it('Should call registered command handler', async () => {
            getContainer().unbind('PlaceOrderCommandHandler');

            const commandHandler: ICommandHandler = {
                handle: async (command: ICommand) => {

                },
            } as ICommandHandler;

            getContainer().bind<ICommandHandler>('PlaceOrderCommandHandler').toConstantValue(commandHandler);

            getContainer().unbind('ILocationRepository');

            const locationRepository: IRepository<Location, number> = {
                find: async (id: number) => {
                    return new Location(id, 0, 0, `Location ${id}`);
                },
            } as IRepository<Location, number>;

            getContainer().bind<IRepository<Location, number>>('ILocationRepository').toConstantValue(locationRepository);

            const commandHandlerHandleSpy: sinon.SinonSpy = sinon.spy(commandHandler, 'handle');

            supertest(app)
                .post('/api/orders/place')
                .send({
                    destinationId: 2,
                    dimensions: '10,20,30',
                    sourceId: 1,
                    weight: 20,
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((error: Error, response: any) => {
                    if (error) {
                        throw error;
                    }

                    expect(commandHandlerHandleSpy.calledOnce).to.be.true;
                });
        });

        it('Should call registered command handler with correct parameters', async () => {
            getContainer().unbind('PlaceOrderCommandHandler');

            const commandHandler: ICommandHandler = {
                handle: async (command: ICommand) => {

                },
            } as ICommandHandler;

            getContainer().bind<ICommandHandler>('PlaceOrderCommandHandler').toConstantValue(commandHandler);

            getContainer().unbind('ILocationRepository');

            const locationRepository: IRepository<Location, number> = {
                find: async (id: number) => {
                    return new Location(id, 0, 0, `Location ${id}`);
                },
            } as IRepository<Location, number>;

            getContainer().bind<IRepository<Location, number>>('ILocationRepository').toConstantValue(locationRepository);

            const commandHandlerHandleSpy: sinon.SinonSpy = sinon.spy(commandHandler, 'handle');

            supertest(app)
                .post('/api/orders/place')
                .send({
                    destinationId: 2,
                    dimensions: '10,20,30',
                    sourceId: 1,
                    weight: 20,
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((error: Error, response: any) => {
                    if (error) {
                        throw error;
                    }

                    const placeOrderCommand: PlaceOrderCommand = commandHandlerHandleSpy.args[0][0];

                    expect(placeOrderCommand.id).to.be.not.null;
                    expect(placeOrderCommand.order).to.be.not.null;
                    expect(placeOrderCommand.order.id).to.be.not.null;

                    expect(placeOrderCommand.order.destination).to.be.not.null;
                    expect(placeOrderCommand.order.destination.id).to.be.eq(2);
                    expect(placeOrderCommand.order.destination.name).to.be.eq('Location 2');

                    expect(placeOrderCommand.order.dimensions).to.be.not.null;
                    expect(placeOrderCommand.order.dimensions.height).to.be.eq(30);
                    expect(placeOrderCommand.order.dimensions.length).to.be.eq(10);
                    expect(placeOrderCommand.order.dimensions.width).to.be.eq(20);

                    expect(placeOrderCommand.order.source).to.be.not.null;
                    expect(placeOrderCommand.order.source.id).to.be.eq(1);
                    expect(placeOrderCommand.order.source.name).to.be.eq('Location 1');

                    expect(placeOrderCommand.order.weight).to.be.eq(20);
                });
        });

    });

});
