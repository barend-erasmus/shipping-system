import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';

export class OrderDeclinedFailedCommand implements ICommand {
  constructor(public id: string, public message: string, public order: Order) {}
}
