import { ICommand } from '../interfaces/command';

export class ApproveOrderCommand implements ICommand {

    constructor(
        public id: string,
        public agentId: string,
        public orderId: string,
    ) {

    }

}
