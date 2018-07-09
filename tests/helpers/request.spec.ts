import { expect } from 'chai';
import { RequestHelper } from '../../src/helpers/request';

describe('RequestHelper', () => {

    describe('#signature', () => {

        it('Should return signature', async () => {
            const signature: string = RequestHelper.signature('method', 'url', 'body', 'query', 'key');

            expect(signature).to.be.eq('1ff0ec7a26bd154621e4ebc631ce60fcc2b61d6d');
        });

    });

});
