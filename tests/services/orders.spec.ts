import { expect } from 'chai';
import * as sinon from 'sinon';
import { Order } from '../../src/entities/order';
import { ICommand } from '../../src/interfaces/command';
import { ICommandBusClient } from '../../src/interfaces/command-bus-client';
import { IWritableRepository } from '../../src/interfaces/writable-repository';
import { OrdersService } from './../../src/services/orders';

describe('OrdersService', () => {

    describe('#create', () => {

        it('Should return Order', async () => {
            const orderPlacedCommandBusClient: ICommandBusClient = {
                execute: (command: ICommand) => {

                },
            } as ICommandBusClient;

            const orderRepository: IWritableRepository<Order, string> = {
                insert: async (entity: Order) => {
                    return entity;
                },
            } as IWritableRepository<Order, string>;

            const ordersService: OrdersService = new OrdersService(orderPlacedCommandBusClient, orderRepository);

            const result: Order = await ordersService.create(new Order(null, null, null, null, null, null, null, null, null, null, null, null, null));

            expect(result).to.be.not.null;
        });

        it('Should call repository', async () => {
            const orderPlacedCommandBusClient: ICommandBusClient = {
                execute: (command: ICommand) => {

                },
            } as ICommandBusClient;

            const orderRepository: IWritableRepository<Order, string> = {
                insert: async (entity: Order) => {
                    return entity;
                },
            } as IWritableRepository<Order, string>;

            const orderRepositoryInsertSpy: sinon.SinonSpy = sinon.spy(orderRepository, 'insert');

            const ordersService: OrdersService = new OrdersService(orderPlacedCommandBusClient, orderRepository);

            const result: Order = await ordersService.create(new Order(null, null, null, null, null, null, null, null, null, null, null, null, null));

            expect(orderRepositoryInsertSpy.calledOnce).to.be.true;
        });

        it('Should call command bus', async () => {
            const orderPlacedCommandBusClient: ICommandBusClient = {
                execute: (command: ICommand) => {

                },
            } as ICommandBusClient;

            const orderRepository: IWritableRepository<Order, string> = {
                insert: async (entity: Order) => {
                    return entity;
                },
            } as IWritableRepository<Order, string>;

            const orderPlacedCommandBusClientExecuteSpy: sinon.SinonSpy = sinon.spy(orderPlacedCommandBusClient, 'execute');

            const ordersService: OrdersService = new OrdersService(orderPlacedCommandBusClient, orderRepository);

            const result: Order = await ordersService.create(new Order(null, null, null, null, null, null, null, null, null, null, null, null, null));

            expect(orderPlacedCommandBusClientExecuteSpy.calledOnce).to.be.true;
        });

    });

});
