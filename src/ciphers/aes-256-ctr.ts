import * as crypto from 'crypto';
import { ICipher } from '../interfaces/cipher';

export class AES256CTRCipher implements ICipher {
  constructor(protected password: string) {}

  public decrypt(data: string): string {
    const iv: Buffer = Buffer.from(this.hash(this.password).slice(16), 'utf8');

    const cipher: crypto.Decipher = crypto.createDecipheriv('aes-256-ctr', this.hash(this.password), iv);

    let decrypted: string = cipher.update(data, 'hex', 'utf8');
    decrypted += cipher.final('utf8');

    return decrypted;
  }

  public encrypt(data: string): string {
    const iv: Buffer = Buffer.from(this.hash(this.password).slice(16), 'utf8');

    const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-ctr', this.hash(this.password), iv);

    let encrypted: string = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  protected hash(data: string): string {
    return crypto
      .createHash('md5')
      .update(data, 'utf8')
      .digest('hex')
      .toUpperCase();
  }
}
