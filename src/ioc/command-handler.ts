import { Container } from 'inversify';
import { ApproveOrderCommandHandler } from '../handlers/approve-order-command';
import { CancelOrderCommandHandler } from '../handlers/cancel-order-command';
import { ConfirmOrderCommandHandler } from '../handlers/confirm-order-command';
import { DeclineOrderCommandHandler } from '../handlers/decline-order-command';
import { OrderApprovedCommandHandler } from '../handlers/order-approved-command';
import { OrderApprovedFailedCommandHandler } from '../handlers/order-approved-failed-command';
import { OrderCancelledCommandHandler } from '../handlers/order-cancelled-command';
import { OrderConfirmedCommandHandler } from '../handlers/order-confirmed-command';
import { OrderDeclinedCommandHandler } from '../handlers/order-declined-command';
import { OrderPlacedCommandHandler } from '../handlers/order-placed-command';
import { PlaceOrderCommandHandler } from '../handlers/place-order-command';
import { ICommandHandler } from '../interfaces/command-handler';

export function registerCommandHandlers(container: Container) {
    container.bind<ICommandHandler>('ApproveOrderCommandHandler').to(ApproveOrderCommandHandler);
    container.bind<ICommandHandler>('CancelOrderCommandHandler').to(CancelOrderCommandHandler);
    container.bind<ICommandHandler>('ConfirmOrderCommandHandler').to(ConfirmOrderCommandHandler);
    container.bind<ICommandHandler>('DeclineOrderCommandHandler').to(DeclineOrderCommandHandler);
    container.bind<ICommandHandler>('OrderApprovedCommandHandler').to(OrderApprovedCommandHandler);
    container.bind<ICommandHandler>('OrderApprovedFailedCommandHandler').to(OrderApprovedFailedCommandHandler);
    container.bind<ICommandHandler>('OrderCancelledCommandHandler').to(OrderCancelledCommandHandler);
    container.bind<ICommandHandler>('OrderConfirmedCommandHandler').to(OrderConfirmedCommandHandler);
    container.bind<ICommandHandler>('OrderDeclinedCommandHandler').to(OrderDeclinedCommandHandler);
    container.bind<ICommandHandler>('OrderPlacedCommandHandler').to(OrderPlacedCommandHandler);
    container.bind<ICommandHandler>('PlaceOrderCommandHandler').to(PlaceOrderCommandHandler);
}
