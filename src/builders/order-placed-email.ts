import { injectable } from 'inversify';
import 'reflect-metadata';
import { configuration } from '../configuration';
import { Order } from '../entities/order';
import { RequestHelper } from '../helpers/request';
import { IBuilder } from '../interfaces/builder';

@injectable()
export class OrderPlacedEmailBuilder implements IBuilder<string> {
  protected emailAddress: string = null;

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
    this.emailAddress = null;
    this.order = null;
    this.type = null;
    this.url = null;

    return this;
  }

  public setEmailAddress(emailAddress: string): OrderPlacedEmailBuilder {
    this.emailAddress = emailAddress;

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
    const signatureApprove: string = RequestHelper.signature(
      'GET',
      '/api/orders/approve',
      {},
      {
        emailAddress: this.emailAddress,
        orderId: this.order.id,
      },
      configuration.signatureKey,
    );

    const urlApprove: string = `${this.url}/api/orders/approve?orderId=${this.order.id}&emailAddress=${
      this.emailAddress
    }&signature=${signatureApprove}`;

    const signatureDecline: string = RequestHelper.signature(
      'GET',
      '/api/orders/decline',
      {},
      {
        emailAddress: this.emailAddress,
        orderId: this.order.id,
      },
      configuration.signatureKey,
    );

    const urlDecline: string = `${this.url}/api/orders/decline?orderId=${this.order.id}&emailAddress=${
      this.emailAddress
    }&signature=${signatureDecline}`;

    return `
            <h3>Order Placed at Shipping System</h3>
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
            <br />
            You can <a href="${urlApprove}">approve</a> or <a href="${urlDecline}">decline</a> this order.
        `;
  }

  protected buildForClient(): string {
    const signatureCancel: string = RequestHelper.signature(
      'GET',
      '/api/orders/cancel',
      {},
      {
        emailAddress: this.emailAddress,
        orderId: this.order.id,
      },
      configuration.signatureKey,
    );

    const urlCancel: string = `${this.url}/api/orders/cancel?orderId=${this.order.id}&emailAddress=${
      this.emailAddress
    }&signature=${signatureCancel}`;

    return `
            <h3>Order Placed at Shipping System</h3>
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
            <br />
            You can <a href="${urlCancel}">cancel</a> your order at anytime.
        `;
  }
}
