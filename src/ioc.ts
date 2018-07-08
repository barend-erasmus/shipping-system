import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { OrderApprovedEmailBuilder } from './builders/order-approved-email';
import { OrderPlacedEmailBuilder } from './builders/order-placed-email';
import { AES256CTRCipher } from './ciphers/aes-256-ctr';
import { InMemoryCommandBusClient } from './clients/in-memory-command-bus';
import { configuration } from './configuration';
import { Agent } from './entities/agent';
import { Order } from './entities/order';
import { SendGridEmailGateway } from './gateways/send-grid-email';
import { ApproveOrderCommandHandler } from './handlers/approve-order-command';
import { OrderApprovedCommandHandler } from './handlers/order-approved-command';
import { OrderCancelledCommandHandler } from './handlers/order-cancelled-command';
import { OrderConfirmedCommandHandler } from './handlers/order-confirmed-command';
import { OrderDeclinedCommandHandler } from './handlers/order-declined-command';
import { OrderPlacedCommandHandler } from './handlers/order-placed-command';
import { PlaceOrderCommandHandler } from './handlers/place-order-command';
import { IBuilder } from './interfaces/builder';
import { ICommandBusClient } from './interfaces/command-bus-client';
import { ICommandHandler } from './interfaces/command-handler';
import { IEmailGateway } from './interfaces/email-gateway';
import { IOrdersService } from './interfaces/orders-service';
import { IRepository } from './interfaces/repository';
import { IValidator } from './interfaces/validator';
import { IWritableRepository } from './interfaces/writable-repository';
import { AgentsRepository } from './repositories/agents';
import { BaseRepository } from './repositories/base';
import { LocationsRepository } from './repositories/locations';
import { OrdersRepository } from './repositories/orders';
import { OrdersService } from './services/orders';
import { OrderValidator } from './validators/order';
import { Location } from './value-objects/location';

let container: Container = null;

export function getContainer(): Container {
    if (container) {
        return container;
    }

    container = new Container();

    // Builders
    container.bind<IBuilder<string>>('OrderApprovedEmailBuilder').to(OrderApprovedEmailBuilder);
    container.bind<IBuilder<string>>('OrderPlacedEmailBuilder').to(OrderPlacedEmailBuilder);

    // Command Handlers
    container.bind<ICommandHandler>('ApproveOrderCommandHandler').to(ApproveOrderCommandHandler);
    container.bind<ICommandHandler>('OrderApprovedCommandHandler').to(OrderApprovedCommandHandler);
    container.bind<ICommandHandler>('OrderCancelledCommandHandler').to(OrderCancelledCommandHandler);
    container.bind<ICommandHandler>('OrderConfirmedCommandHandler').to(OrderConfirmedCommandHandler);
    container.bind<ICommandHandler>('OrderDeclinedCommandHandler').to(OrderDeclinedCommandHandler);
    container.bind<ICommandHandler>('OrderPlacedCommandHandler').to(OrderPlacedCommandHandler);
    container.bind<ICommandHandler>('PlaceOrderCommandHandler').to(PlaceOrderCommandHandler);

    // Clients
    container.bind<ICommandBusClient>('ApproveOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const approveOrderCommandBusClient: ICommandHandler = context.container.get<ApproveOrderCommandHandler>('ApproveOrderCommandHandler');

        commandBusClient.register(approveOrderCommandBusClient);

        return commandBusClient;
    });

    container.bind<ICommandBusClient>('OrderApprovedCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const orderApprovedCommandHandler: ICommandHandler = context.container.get<OrderApprovedCommandHandler>('OrderApprovedCommandHandler');

        commandBusClient.register(orderApprovedCommandHandler);

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

    // Validators
    container.bind<IValidator<Order>>('OrderValidator').to(OrderValidator);

    // Repositories
    container.bind<BaseRepository>('BaseRepository').toConstantValue(new BaseRepository());
    container.bind<IRepository<Agent, string>>('AgentsRepository').to(AgentsRepository);
    container.bind<IRepository<Location, number>>('LocationsRepository').to(LocationsRepository);
    container.bind<IWritableRepository<Order, string>>('OrdersRepository').to(OrdersRepository);

    // Gateways
    container.bind<IEmailGateway>('IEmailGateway').toConstantValue(new SendGridEmailGateway(new AES256CTRCipher(configuration.sendGrid.password).decrypt(configuration.sendGrid.encryptedAPIKey)));

    // Services
    container.bind<IOrdersService>('IOrdersService').to(OrdersService);

    return container;
}

export function resetContainer(): void {
    container = null;
}
