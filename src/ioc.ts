import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { InMemoryCommandBusClient } from './clients/in-memory-command-bus';
import { PlaceOrderCommandHandler } from './handlers/place-order-command';
import { ICommandBusClient } from './interfaces/command-bus-client';
import { ICommandHandler } from './interfaces/command-handler';
import { IRepository } from './interfaces/repository';
import { LocationRepository } from './repositories/locations';
import { Location } from './value-objects/location';

let container: Container = null;

export function getContainer(): Container {
    if (container) {
        return container;
    }

    container = new Container();

    // Command Handlers
    container.bind<ICommandHandler>('PlaceOrderCommandHandler').to(PlaceOrderCommandHandler);

    // Clients
    container.bind<ICommandBusClient>('IPlaceOrderCommandBusClient').toDynamicValue((context: interfaces.Context) => {
        const commandBusClient: ICommandBusClient = new InMemoryCommandBusClient();

        const placeOrderCommandHandler: ICommandHandler = context.container.get<PlaceOrderCommandHandler>('PlaceOrderCommandHandler');

        commandBusClient.register(placeOrderCommandHandler);

        return commandBusClient;
    });

    // Repositories
    container.bind<IRepository<Location, number>>('ILocationRepository').to(LocationRepository);

    return container;
}

export function resetContainer(): void {
    container = null;
}
