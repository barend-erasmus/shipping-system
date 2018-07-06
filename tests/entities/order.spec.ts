import { expect } from 'chai';
import { Agent } from '../../src/entities/agent';
import { Dimensions } from '../../src/value-objects/dimensions';
import { Order } from './../../src/entities/order';

describe('Order', () => {

    describe('#getDensity', () => {

        it('Should return correct density', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, new Dimensions(10, 20, 30), null, 20);

            const result: number = order.getDensity();

            expect(result).to.be.eq(0.003);
        });

    });

    describe('#setToApproved', () => {

        it('Should set approved to true', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, new Dimensions(10, 20, 30), null, 20);

            order.setToApproved(null);

            expect(order.approved).to.be.true;
        });

        it('Should set agent', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, new Dimensions(10, 20, 30), null, 20);

            order.setToApproved(new Agent(null, null, null));

            expect(order.agent).to.be.not.null;
        });

    });

});
