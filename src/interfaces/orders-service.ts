import { Order } from '../entities/order';

export interface IOrdersService {

    approve(agentEmailAddress: string, orderId: string): Promise<Order>;

    cancel(orderId: string): Promise<Order>;

    confirm(orderId: string): Promise<Order>;

    create(order: Order): Promise<Order>;

    decline(orderId: string): Promise<Order>;

}
