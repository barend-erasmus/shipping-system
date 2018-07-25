import { ICommand } from '../interfaces/command';

export class ApproveOrderCommand implements ICommand {
  constructor(public id: string, public agentEmailAddress: string, public orderId: string) {}
}
