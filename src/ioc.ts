import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { OrderPlacedEmailBuilder } from './builders/order-placed-email-builder';
import { AES256CTRCipher } from './ciphers/aes-256-ctr';
import { InMemoryCommandBusClient } from './clients/in-memory-command-bus';
import { Order } from './entities/order';
import { SendGridEmailGateway } from './gateways/send-grid-email';
import { OrderPlacedCommandHandler } from './handlers/order-placed-command';
import { PlaceOrderCommandHandler } from './handlers/place-order-command';
import { IBuilder } from './interfaces/builder';
import { ICommandBusClient } from './interfaces/command-bus-client';
import { ICommandHandler } from './interfaces/command-handler';
import { IEmailGateway } from './interfaces/email-gateway';
import { IOrdersService } from './interfaces/orders-service';
import { IRepository } from './interfaces/repository';
import { IWritableRepository } from './interfaces/writable-repository';
import { BaseRepository } from './repositories/base';
import { LocationsRepository } from './repositories/locations';
import { OrdersRepository } from './repositories/orders';
import { OrdersService } from './services/orders';
import { Location } from './value-objects/location';

let container: Container = null;

export function getContainer(): Container {
    if (container) {
        return container;
    }

    container = new Container();

    // Builders
    container.bind<IBuilder<string>>('OrderPlacedEmailBuilder').to(OrderPlacedEmailBuilder);

    // Command Handlers
    container.bind<ICommandHandler>('OrderPlacedCommandHandler').to(OrderPlacedCommandHandler);
    container.bind<ICommandHandler>('PlaceOrderCommandHandler').to(PlaceOrderCommandHandler);

    // Clients
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

    // Repositories
    container.bind<BaseRepository>('BaseRepository').toConstantValue(new BaseRepository());
    container.bind<IRepository<Location, number>>('ILocationsRepository').to(LocationsRepository);
    container.bind<IWritableRepository<Order, string>>('IOrdersRepository').to(OrdersRepository);

    // Gateways
    container.bind<IEmailGateway>('IEmailGateway').toConstantValue(new SendGridEmailGateway(new AES256CTRCipher('password').decrypt('dbd090268bf21567a3e2d898ba4cdcf0e49e09b66bf5b85070f559fd1c9bd8f173e7c7cfdff3f172c74319e23ea2be2a067a131b26329cd6f75d4b09a7309c877e719d2579')));

    // Services
    container.bind<IOrdersService>('IOrdersService').to(OrdersService);

    return container;
}

export function resetContainer(): void {
    container = null;
}
