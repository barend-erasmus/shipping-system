import { ICommand } from '../interfaces/command';

export class ConfirmOrderCommand implements ICommand {
  constructor(public id: string, public orderId: string) {}
}
