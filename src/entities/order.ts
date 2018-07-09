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

    public setToApproved(agent: Agent): void {
        if (!agent) {
            throw new Error('Agent required');
        }

        if (this.cancelled) {
            throw new Error('Order has been cancelled');
        }

        if (this.confirmed) {
            throw new Error('Order has been confirmed');
        }

        if (this.approved) {
            throw new Error('Order has been approved');
        }

        if (this.declined) {
            throw new Error('Order has been declined');
        }

        this.approved = true;
        this.agent = agent;
    }

    public setToCancelled(): void {
        if (this.cancelled) {
            throw new Error('Order has been cancelled');
        }

        this.cancelled = true;
    }

    public setToConfirmed(): void {
        if (this.cancelled) {
            throw new Error('Order has been cancelled');
        }

        if (this.confirmed) {
            throw new Error('Order has been confirmed');
        }

        if (!this.approved) {
            throw new Error('Order has not been approved');
        }

        if (this.declined) {
            throw new Error('Order has been declined');
        }

        this.confirmed = true;
    }

    public setToDeclined(): void {
        if (this.cancelled) {
            throw new Error('Order has been cancelled');
        }

        if (this.confirmed) {
            throw new Error('Order has been confirmed');
        }

        if (this.approved) {
            throw new Error('Order has been approved');
        }

        if (this.declined) {
            throw new Error('Order has been declined');
        }

        this.declined = true;
    }

}
