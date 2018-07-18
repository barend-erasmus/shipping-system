import { injectable } from 'inversify';
import 'reflect-metadata';
import { Order } from '../entities/order';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderCancelledEmailBuilder implements IBuilder<string> {

    protected order: Order = null;

    protected type: string = null;

    public build(): string {
        switch (this.type) {
            case 'agent':
                return this.buildForAgent();
            case 'client':
                return this.buildForClient();
            default:
                throw new Error(`invalid type of ${this.type}`);
        }
    }

    public reset(): OrderCancelledEmailBuilder {
        this.order = null;
        this.type = null;

        return this;
    }

    public setOrder(order: Order): OrderCancelledEmailBuilder {
        this.order = order;

        return this;
    }

    public setToAgent(): OrderCancelledEmailBuilder {
        this.type = 'agent';

        return this;
    }

    public setToClient(): OrderCancelledEmailBuilder {
        this.type = 'client';

        return this;
    }

    protected buildForAgent(): string {
        return `
            <h3>Order Cancelled at Shipping System</h3>
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

    protected buildForClient(): string {
        return `
            <h3>Order Cancelled at Shipping System</h3>
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

}
