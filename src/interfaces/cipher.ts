export interface ICipher {
  decrypt(data: string): string;

  encrypt(data: string): string;
}
