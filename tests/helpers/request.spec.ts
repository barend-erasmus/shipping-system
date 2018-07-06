import { expect } from 'chai';
import { RequestHelper } from '../../src/helpers/request';

describe('RequestHelper', () => {

    describe('#signature', () => {

        it('Should return signature', async () => {
            const signature: string = RequestHelper.signature('method', 'url', 'body', 'query', 'key');

            expect(signature).to.be.eq('b61a72c5ed9b36eff82f1175c708a0b664415d79');
        });

    });

});
