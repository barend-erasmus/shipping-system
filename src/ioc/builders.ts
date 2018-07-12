import { Container } from 'inversify';
import { OrderApprovedEmailBuilder } from '../builders/order-approved-email';
import { OrderApprovedFailedEmailBuilder } from '../builders/order-approved-failed-email';
import { OrderPlacedEmailBuilder } from '../builders/order-placed-email';
import { IBuilder } from '../interfaces/builder';

export function registerBuilders(container: Container) {
    container.bind<IBuilder<string>>('OrderApprovedEmailBuilder').to(OrderApprovedEmailBuilder);
    container.bind<IBuilder<string>>('OrderApprovedFailedEmailBuilder').to(OrderApprovedFailedEmailBuilder);
    container.bind<IBuilder<string>>('OrderPlacedEmailBuilder').to(OrderPlacedEmailBuilder);
}
