import { AgentDTO } from './agent';
import { DimensionsDTO } from './dimensions';
import { AccountDTO } from './account';
import { DestinationDTO } from './destination';
import { SourcesDTO } from './source';

export class OrderDTO {

    constructor(
        public id: string,
        public account: AccountDTO,
        public agent: AgentDTO,
        public approved: boolean,
        public cancelled: boolean,
        public collectionTimestamp: Date,
        public confirmed: boolean,
        public cost: number,
        public declined: boolean,
        public deliveryTimestamp: Date,
        public density: number,
        public destination: DestinationDTO,
        public dimensions: DimensionsDTO,
        public source: SourcesDTO,
        public weight: number,
    ) {
    }

}
