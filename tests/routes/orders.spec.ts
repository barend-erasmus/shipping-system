import { expect } from 'chai';
import * as sinon from 'sinon';
import * as supertest from 'supertest';
import { app } from '../../src/app';
import { PlaceOrderCommand } from '../../src/commands/place-order';
import { ICommand } from '../../src/interfaces/command';
import { ICommandBusClient } from '../../src/interfaces/command-bus-client';
import { IRepository } from '../../src/interfaces/repository';
import { Location } from '../../src/value-objects/location';
import { getContainer, resetContainer } from './../../src/ioc';

describe('OrdersRouter', () => {

    describe('#place', () => {

        beforeEach(() => {
            resetContainer();
        });

        it('Should call command bus', async () => {
            getContainer().unbind('PlaceOrderCommandBusClient');

            const placeOrderCommandBusClient: ICommandBusClient = {
                execute: (command: ICommand) => {

                },
            } as ICommandBusClient;

            getContainer().bind<ICommandBusClient>('PlaceOrderCommandBusClient').toConstantValue(placeOrderCommandBusClient);

            getContainer().unbind('LocationsRepository');

            const locationsRepository: IRepository<Location, number> = {
                find: async (id: number) => {
                    return new Location(id, 0, 0, `Location ${id}`);
                },
            } as IRepository<Location, number>;

            getContainer().bind<IRepository<Location, number>>('LocationsRepository').toConstantValue(locationsRepository);

            const placeOrderCommandBusClientExecuteSpy: sinon.SinonSpy = sinon.spy(placeOrderCommandBusClient, 'execute');

            supertest(app)
                .post('/api/orders/place')
                .send({
                    account: {
                        accountNumber: 'accountNumber',
                        emailAddress: 'emailAddress',
                        name: 'name',
                    },
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

                    expect(placeOrderCommandBusClientExecuteSpy.calledOnce).to.be.true;
                });
        });

        it('Should call registered command bus with correct parameters', async () => {
            getContainer().unbind('PlaceOrderCommandBusClient');

            const placeOrderCommandBusClient: ICommandBusClient = {
                execute: (command: ICommand) => {

                },
            } as ICommandBusClient;

            getContainer().bind<ICommandBusClient>('PlaceOrderCommandBusClient').toConstantValue(placeOrderCommandBusClient);

            getContainer().unbind('LocationsRepository');

            const locationsRepository: IRepository<Location, number> = {
                find: async (id: number) => {
                    return new Location(id, 0, 0, `Location ${id}`);
                },
            } as IRepository<Location, number>;

            getContainer().bind<IRepository<Location, number>>('LocationsRepository').toConstantValue(locationsRepository);

            const placeOrderCommandBusClientExecuteSpy: sinon.SinonSpy = sinon.spy(placeOrderCommandBusClient, 'execute');

            supertest(app)
                .post('/api/orders/place')
                .send({
                    account: {
                        accountNumber: 'accountNumber',
                        emailAddress: 'emailAddress',
                        name: 'name',
                    },
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

                    const placeOrderCommand: PlaceOrderCommand = placeOrderCommandBusClientExecuteSpy.args[0][0];

                    expect(placeOrderCommand.id).to.be.not.null;
                    expect(placeOrderCommand.order).to.be.not.null;
                    expect(placeOrderCommand.order.id).to.be.not.null;
                    expect(placeOrderCommand.order.approved).to.be.eq(false);
                    expect(placeOrderCommand.order.cancelled).to.be.eq(false);
                    expect(placeOrderCommand.order.collectionTimestamp).to.be.eq(null);
                    expect(placeOrderCommand.order.confirmed).to.be.eq(false);
                    expect(placeOrderCommand.order.cost).to.be.eq(null);
                    expect(placeOrderCommand.order.declined).to.be.eq(false);
                    expect(placeOrderCommand.order.deliveryTimestamp).to.be.eq(null);
                    expect(placeOrderCommand.order.weight).to.be.eq(20);

                    expect(placeOrderCommand.order.account).to.be.not.null;
                    expect(placeOrderCommand.order.account.accountNumber).to.be.eq('accountNumber');
                    expect(placeOrderCommand.order.account.emailAddress).to.be.eq('emailAddress');
                    expect(placeOrderCommand.order.account.name).to.be.eq('name');

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
                });
        });

    });

});
