import { injectable } from 'inversify';
import 'reflect-metadata';
import { Order } from '../entities/order';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderConfirmedFailedEmailBuilder implements IBuilder<string> {
  protected order: Order = null;

  public build(): string {
    return `
            <h3>Order Confirmation Failed at Shipping System</h3>
            <br />
            <label>Source: </label>${this.order.source.name}
            <br />
            <label>Destination: </label>${this.order.destination.name}
            <br />
            <label>Dimensions: </label>${this.order.dimensions.height} cm (Height), ${
      this.order.dimensions.length
    } cm (Length), ${this.order.dimensions.width} cm (Width)
            <br />
            <label>Weight: </label>${this.order.weight} kg (${this.order.getDensity()} kg/cm&sup3;)
        `;
  }

  public reset(): OrderConfirmedFailedEmailBuilder {
    this.order = null;

    return this;
  }

  public setOrder(order: Order): OrderConfirmedFailedEmailBuilder {
    this.order = order;

    return this;
  }
}
