import { Order } from '../entities/order';

export interface IOrdersService {

    approve(order: Order): Promise<Order>;

    cancel(order: Order): Promise<Order>;

    confrim(order: Order): Promise<Order>;

    create(order: Order): Promise<Order>;

    decline(order: Order): Promise<Order>;

}
