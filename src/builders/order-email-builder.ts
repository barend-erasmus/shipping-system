import { Order } from '../entities/order';
import { IBuilder } from '../interfaces/builder';

export class OrderEmailBuilder implements IBuilder<string> {

    protected order: Order = null;

    public build(): string {
        return null;
    }

    public reset(): OrderEmailBuilder {
        return this;
    }

    public setOrder(order: Order): OrderEmailBuilder {
        this.order = order;

        return this;
    }

}
