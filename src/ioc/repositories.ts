import { Container } from 'inversify';
import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { IRepository } from '../interfaces/repository';
import { IWritableRepository } from '../interfaces/writable-repository';
import { AgentsRepository } from '../repositories/agents';
import { BaseRepository } from '../repositories/base';
import { LocationsRepository } from '../repositories/locations';
import { OrdersRepository } from '../repositories/orders';
import { Location } from '../value-objects/location';

export function registerRepositories(container: Container) {
  container.bind<BaseRepository>('BaseRepository').toConstantValue(new BaseRepository());
  container.bind<IRepository<Agent, string>>('AgentsRepository').to(AgentsRepository);
  container.bind<IRepository<Location, number>>('LocationsRepository').to(LocationsRepository);
  container.bind<IWritableRepository<Order, string>>('OrdersRepository').to(OrdersRepository);
}
