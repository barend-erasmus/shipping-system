import { Container, interfaces } from 'inversify';
import { InMemoryCommandBusClient } from '../clients/in-memory-command-bus';
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
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { ICommandHandler } from '../interfaces/command-handler';

export function registerClients(container: Container) {
    container.bind<ICommandBusClient>('ApproveOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const approveOrderCommandBusClient: ICommandHandler = context.container.get<ApproveOrderCommandHandler>('ApproveOrderCommandHandler');

        commandBusClient.register(approveOrderCommandBusClient);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('CancelOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const cancelOrderCommandBusClient: ICommandHandler = context.container.get<CancelOrderCommandHandler>('CancelOrderCommandHandler');

        commandBusClient.register(cancelOrderCommandBusClient);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('ConfirmOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const confirmOrderCommandBusClient: ICommandHandler = context.container.get<ConfirmOrderCommandHandler>('ConfirmOrderCommandHandler');

        commandBusClient.register(confirmOrderCommandBusClient);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('DeclineOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const declineOrderCommandBusClient: ICommandHandler = context.container.get<DeclineOrderCommandHandler>('DeclineOrderCommandHandler');

        commandBusClient.register(declineOrderCommandBusClient);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderApprovedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderApprovedCommandHandler: ICommandHandler = context.container.get<OrderApprovedCommandHandler>('OrderApprovedCommandHandler');

        commandBusClient.register(orderApprovedCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderApprovedFailedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderApprovedFailedCommandHandler: ICommandHandler = context.container.get<OrderApprovedFailedCommandHandler>('OrderApprovedFailedCommandHandler');

        commandBusClient.register(orderApprovedFailedCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderCancelledCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderCancelledCommandHandler: ICommandHandler = context.container.get<OrderCancelledCommandHandler>('OrderCancelledCommandHandler');

        commandBusClient.register(orderCancelledCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderConfirmedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderConfirmedCommandHandler: ICommandHandler = context.container.get<OrderConfirmedCommandHandler>('OrderConfirmedCommandHandler');

        commandBusClient.register(orderConfirmedCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderDeclinedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderDeclinedCommandHandler: ICommandHandler = context.container.get<OrderDeclinedCommandHandler>('OrderDeclinedCommandHandler');

        commandBusClient.register(orderDeclinedCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderPlacedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderPlacedCommandHandler: ICommandHandler = context.container.get<OrderPlacedCommandHandler>('OrderPlacedCommandHandler');

        commandBusClient.register(orderPlacedCommandHandler);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('PlaceOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const placeOrderCommandHandler: ICommandHandler = context.container.get<PlaceOrderCommandHandler>('PlaceOrderCommandHandler');

        commandBusClient.register(placeOrderCommandHandler);

        return commandBusClient;
    });
}
