import { Container } from 'inversify';
import { Order } from '../entities/order';
import { IValidator } from '../interfaces/validator';
import { OrderValidator } from '../validators/order';

export function registerValidators(container: Container) {
    container.bind<IValidator<Order>>('OrderValidator').to(OrderValidator);
}
