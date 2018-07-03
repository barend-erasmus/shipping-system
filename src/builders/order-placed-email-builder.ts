import { injectable } from 'inversify';
import { Order } from '../entities/order';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderPlacedEmailBuilder implements IBuilder<string> {

    protected order: Order = null;

    public build(): string {
        return `
            <h3>Order Placed at Shipping System</h3>
            <br />
            <label>Source: </label>${this.order.source.name}
            <br />
            <label>Destination: </label>${this.order.destination.name}
            <br />
            <label>Dimensions: </label>${this.order.dimensions.height}, ${this.order.dimensions.length}, ${this.order.dimensions.width}
            <br />
            <label>Weight: </label>${this.order.weight} kg (${this.order.getDensity()} kg/cm&sup3;)
        `;
    }

    public reset(): OrderPlacedEmailBuilder {
        return this;
    }

    public setOrder(order: Order): OrderPlacedEmailBuilder {
        this.order = order;

        return this;
    }

}
