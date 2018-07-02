import { NumericHelper } from '../helpers/numeric';
import { IEntity } from '../interfaces/entity';
import { Dimensions } from '../value-objects/dimensions';
import { Location } from '../value-objects/location';

export class Order implements IEntity<string> {

    // TODO: Add properties: collectionTimestamp, devliveryTimestamp, cost, approvedByAgent, declinedByAgent, confirmedByClient, cancelledByClient

    constructor(
        public id: string,
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
