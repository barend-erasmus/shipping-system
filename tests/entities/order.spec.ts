import { expect } from 'chai';
import { Agent } from '../../src/entities/agent';
import { Order } from '../../src/entities/order';
import { Dimensions } from '../../src/value-objects/dimensions';

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
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            order.setToApproved(new Agent(null, null, null));

            expect(order.approved).to.be.true;
        });

        it('Should set agent', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            order.setToApproved(new Agent(null, null, null));

            expect(order.agent).to.be.not.null;
        });

        it('Should throw error given null agent', () => {
            const order: Order = new Order(null, null, null, null, true, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToApproved(null);
            }).to.throw();
        });

        it('Should throw error given cancelled', () => {
            const order: Order = new Order(null, null, null, null, true, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToApproved(new Agent(null, null, null));
            }).to.throw();
        });

        it('Should throw error given confirmed', () => {
            const order: Order = new Order(null, null, null, null, null, null, true, null, null, null, null, null, null, null);

            expect(() => {
                order.setToApproved(new Agent(null, null, null));
            }).to.throw();
        });

        it('Should throw error given approved', () => {
            const order: Order = new Order(null, null, null, true, null, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToApproved(new Agent(null, null, null));
            }).to.throw();
        });

        it('Should throw error given declined', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, true, null, null, null, null, null);

            expect(() => {
                order.setToApproved(new Agent(null, null, null));
            }).to.throw();
        });

    });

    describe('#setToCancelled', () => {

        it('Should set cancelled to true', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            order.setToCancelled();

            expect(order.cancelled).to.be.true;
        });

        it('Should throw error given cancelled', () => {
            const order: Order = new Order(null, null, null, null, true, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToCancelled();
            }).to.throw();
        });

    });

    describe('#setToConfirmed', () => {

        it('Should set confirmed to true', () => {
            const order: Order = new Order(null, null, null, true, null, null, null, null, null, null, null, null, null, null);

            order.setToConfirmed();

            expect(order.confirmed).to.be.true;
        });

        it('Should throw error given cancelled', () => {
            const order: Order = new Order(null, null, null, null, true, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToConfirmed();
            }).to.throw();
        });

        it('Should throw error given confirmed', () => {
            const order: Order = new Order(null, null, null, null, null, null, true, null, null, null, null, null, null, null);

            expect(() => {
                order.setToConfirmed();
            }).to.throw();
        });

        it('Should throw error given not approved', () => {
            const order: Order = new Order(null, null, null, false, null, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToConfirmed();
            }).to.throw();
        });

        it('Should throw error given declined', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, true, null, null, null, null, null);

            expect(() => {
                order.setToConfirmed();
            }).to.throw();
        });

    });

    describe('#setToDeclined', () => {

        it('Should set declined to true', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            order.setToDeclined();

            expect(order.declined).to.be.true;
        });

        it('Should throw error given cancelled', () => {
            const order: Order = new Order(null, null, null, null, true, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToDeclined();
            }).to.throw();
        });

        it('Should throw error given confirmed', () => {
            const order: Order = new Order(null, null, null, null, null, null, true, null, null, null, null, null, null, null);

            expect(() => {
                order.setToDeclined();
            }).to.throw();
        });

        it('Should throw error given approved', () => {
            const order: Order = new Order(null, null, null, true, null, null, null, null, null, null, null, null, null, null);

            expect(() => {
                order.setToDeclined();
            }).to.throw();
        });

        it('Should throw error given declined', () => {
            const order: Order = new Order(null, null, null, null, null, null, null, null, true, null, null, null, null, null);

            expect(() => {
                order.setToDeclined();
            }).to.throw();
        });

    });

});
