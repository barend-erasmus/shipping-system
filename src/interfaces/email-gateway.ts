export interface IEmailGateway {
  send(body: string, from: string, subject: string, to: string): Promise<void>;
}
