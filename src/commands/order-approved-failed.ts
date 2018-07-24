import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';

export class OrderApprovedFailedCommand implements ICommand {
  constructor(public id: string, public agent: Agent, public message: string, public order: Order) {}
}
