import { injectable } from 'inversify';
import 'reflect-metadata';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { RequestHelper } from '../helpers/request';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderApprovedFailedEmailBuilder implements IBuilder<string> {

    protected order: Order = null;

    public build(): string {
        return `
            <h3>Order Approval Failed at Shipping System</h3>
            <br />
            <label>Source: </label>${this.order.source.name}
            <br />
            <label>Destination: </label>${this.order.destination.name}
            <br />
            <label>Dimensions: </label>${this.order.dimensions.height} cm (Height), ${this.order.dimensions.length} cm (Length), ${this.order.dimensions.width} cm (Width)
            <br />
            <label>Weight: </label>${this.order.weight} kg (${this.order.getDensity()} kg/cm&sup3;)
        `;
    }

    public reset(): OrderApprovedFailedEmailBuilder {
        this.order = null;

        return this;
    }

    public setOrder(order: Order): OrderApprovedFailedEmailBuilder {
        this.order = order;

        return this;
    }

}
