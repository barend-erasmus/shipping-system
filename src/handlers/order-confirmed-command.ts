import { injectable } from 'inversify';
import 'reflect-metadata';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';

@injectable()
export class OrderConfirmedCommandHandler implements ICommandHandler {
  constructor() {}

  // TODO: Unit Tests
  public async handle(command: ICommand): Promise<void> {
    console.log('Order Confirmed');
  }
}
