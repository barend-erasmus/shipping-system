import { Order } from '../entities/order';
import { IValidator } from '../interfaces/validator';

export class OrderValidator implements IValidator<Order> {

    public getMessages(obj: Order): string[] {
        const messages: string[] = [];

        if (!obj.account) {
            messages.push(`Account is a required field`);
        }

        if (obj.approved === null) {
            messages.push(`Approved is a required field`);
        }

        if (obj.cancelled === null) {
            messages.push(`Cancelled is a required field`);
        }

        if (obj.confirmed === null) {
            messages.push(`Confirmed is a required field`);
        }

        if (obj.declined === null) {
            messages.push(`Declined is a required field`);
        }

        if (!obj.destination) {
            messages.push(`Destination is a required field`);
        }

        if (!obj.dimensions) {
            messages.push(`Dimensions is a required field`);
        }

        if (obj.dimensions && obj.dimensions.height) {
            messages.push(`Height is a required field for Dimensions`);
        }

        if (obj.dimensions && obj.dimensions.length) {
            messages.push(`Length is a required field for Dimensions`);
        }

        if (obj.dimensions && obj.dimensions.width) {
            messages.push(`Width is a required field for Dimensions`);
        }

        if (!obj.source) {
            messages.push(`Source is a required field`);
        }

        if (!obj.weight) {
            messages.push(`Weight is a required field`);
        }

        return messages;
    }

    public validate(obj: Order): boolean {
        if (this.getMessages(obj).length) {
            return false;
        }

        return true;
    }

}
