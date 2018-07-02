import { expect } from 'chai';
import { Dimensions } from '../../src/value-objects/dimensions';
import { Order } from './../../src/entities/order';

describe('Order', () => {

    describe('#getDensity', () => {

        it('Should return correct density', () => {
            const order: Order = new Order(null, null, new Dimensions(10, 20, 30), null, 20);

            const result: number = order.getDensity();

            expect(result).to.be.eq(0.003);
        });

    });

});
