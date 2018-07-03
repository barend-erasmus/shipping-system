import { expect } from 'chai';
import { AES256CTRCipher } from '../../src/ciphers/aes-256-ctr';
import { ICipher } from '../../src/interfaces/cipher';

describe('AES256CTRCipher', () => {

    let cipher: ICipher = null;

    beforeEach(async () => {
        cipher = new AES256CTRCipher('password');
    });

    describe('decrypt', () => {

        it('should return decrypted string', async () => {
            const result: string = cipher.decrypt('f8c9d08f9e923824fd9aad');

            expect(result).to.be.eq('hello world');
        });

    });

    describe('encrypt', () => {

        it('should return encrypted string', async () => {
            const result: string = cipher.encrypt('hello world');

            expect(result).to.be.eq('f8c9d08f9e923824fd9aad');
        });

    });

});
