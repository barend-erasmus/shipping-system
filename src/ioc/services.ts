import { Container } from 'inversify';
import { IOrdersService } from '../interfaces/orders-service';
import { OrdersService } from '../services/orders';

export function registerServices(container: Container) {
    container.bind<IOrdersService>('IOrdersService').to(OrdersService);
}
