import { Container } from 'inversify';
import 'reflect-metadata';
import { registerBuilders } from './ioc/builders';
import { registerClients } from './ioc/client';
import { registerCommandHandlers } from './ioc/command-handler';
import { registerGateways } from './ioc/gateways';
import { registerRepositories } from './ioc/repositories';
import { registerServices } from './ioc/services';
import { registerValidators } from './ioc/validators';

let container: Container = null;

export function getContainer(): Container {
    if (container) {
        return container;
    }

    container = new Container();

    // Builders
    registerBuilders(container);

    // Command Handlers
    registerCommandHandlers(container);

    // Clients
    registerClients(container);

    // Validators
    registerValidators(container);

    // Repositories
    registerRepositories(container);

    // Gateways
    registerGateways(container);

    // Services
    registerServices(container);

    return container;
}

export function resetContainer(): void {
    container = null;
}
