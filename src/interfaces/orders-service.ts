import { Order } from '../entities/order';

export interface IOrdersService {

    approve(accountEmailAddress: string, agentEmailAddress: string, orderId: string): Promise<Order>;

    cancel(accountEmailAddress: string, agentEmailAddress: string, orderId: string): Promise<Order>;

    confrim(accountEmailAddress: string, agentEmailAddress: string, orderId: string): Promise<Order>;

    create(order: Order): Promise<Order>;

    decline(accountEmailAddress: string, agentEmailAddress: string, orderId: string): Promise<Order>;

}
