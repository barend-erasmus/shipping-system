import { expect } from 'chai';
import { NumericHelper } from '../../src/helpers/numeric';

describe('NumericHelper', () => {

    describe('#round', () => {

        it('Should return round number', async () => {
            const value: number = NumericHelper.round(33.3333, 2);

            expect(value).to.be.eq(33.33);
        });

    });

});
