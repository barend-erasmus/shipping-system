import { injectable } from 'inversify';
import 'reflect-metadata';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { RequestHelper } from '../helpers/request';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderPlacedEmailBuilder implements IBuilder<string> {

    protected order: Order = null;

    protected type: string = null;

    protected url: string = null;

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

    public reset(): OrderPlacedEmailBuilder {
        return this;
    }

    public setOrder(order: Order): OrderPlacedEmailBuilder {
        this.order = order;

        return this;
    }

    public setToAgent(): OrderPlacedEmailBuilder {
        this.type = 'agent';

        return this;
    }

    public setToClient(): OrderPlacedEmailBuilder {
        this.type = 'client';

        return this;
    }

    public setURL(url: string): OrderPlacedEmailBuilder {
        this.url = url;

        return this;
    }

    protected buildForAgent(): string {
        const signatureApprove: string = RequestHelper.signature('GET', '/api/orders/approve', {}, {
            id: this.order.id,
        }, configuration.signatureKey);

        const signatureDecline: string = RequestHelper.signature('GET', '/api/orders/approve', {}, {
            id: this.order.id,
        }, configuration.signatureKey);

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
            <br />
            You can <a href="${this.url}/api/orders/approve?id=${this.order.id}&signature=${signatureApprove}">Approve</a> or <a href="${this.url}/api/orders/decline?id=${this.order.id}&signature=${signatureDecline}">Decline</a> this order.
        `;
    }

    protected buildForClient(): string {
        const signatureCancel: string = RequestHelper.signature('GET', '/api/orders/cancel', {}, {
            id: this.order.id,
        }, configuration.signatureKey);

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
            <br />
            You can <a href="${this.url}/api/orders/cancel?id=${this.order.id}&signature=${signatureCancel}">cancel</a> your order at anytime.
        `;
    }

}
