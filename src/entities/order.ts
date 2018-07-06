import { NumericHelper } from '../helpers/numeric';
import { IEntity } from '../interfaces/entity';
import { Account } from '../value-objects/account';
import { Dimensions } from '../value-objects/dimensions';
import { Location } from '../value-objects/location';
import { Agent } from './agent';

export class Order implements IEntity<string> {

    constructor(
        public id: string,
        public account: Account,
        public agent: Agent,
        public approved: boolean,
        public cancelled: boolean,
        public collectionTimestamp: Date,
        public confirmed: boolean,
        public cost: number,
        public declined: boolean,
        public deliveryTimestamp: Date,
        public destination: Location,
        public dimensions: Dimensions,
        public source: Location,
        public weight: number,
    ) {

    }

    public getDensity(): number {
        return NumericHelper.round(this.weight / this.dimensions.getVolume(), 3);
    }

}
