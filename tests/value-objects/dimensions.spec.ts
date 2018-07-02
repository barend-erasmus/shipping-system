import { expect } from 'chai';
import { Dimensions } from '../../src/value-objects/dimensions';

describe('Dimensions', () => {

    describe('#getVolume', () => {

        it('Should return correct volume', () => {
            const dimensions: Dimensions = new Dimensions(10, 20, 30);

            const result: number = dimensions.getVolume();

            expect(result).to.be.eq(6000);
        });

    });

});
