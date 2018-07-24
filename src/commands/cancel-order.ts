import { ICommand } from '../interfaces/command';

export class CancelOrderCommand implements ICommand {
  constructor(public id: string, public orderId: string) {}
}
