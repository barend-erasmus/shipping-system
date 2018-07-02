import { expect } from 'chai';
import { Order } from '../../src/entities/order';
import { ICommandBusClient } from '../../src/interfaces/command-bus-client';
import { InMemoryCommandBusClient } from './../../src/clients/in-memory-command-bus';
import { OrdersService } from './../../src/services/orders';

describe('OrdersService', () => {

    describe('#create', () => {

        it('Should return Order', async  () => {
            const orderPlacedCommandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

            const ordersService: OrdersService = new OrdersService(orderPlacedCommandBusClient);

            const result: Order = await ordersService.create(new Order(null, null, null, null, null));

            expect(result).to.be.not.null;
        });

    });

});
