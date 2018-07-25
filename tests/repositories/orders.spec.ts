import { expect } from 'chai';
import * as uuid from 'uuid';
import { Order } from '../../src/entities/order';
import { IRepository } from '../../src/interfaces/repository';
import { IWritableRepository } from '../../src/interfaces/writable-repository';
import { BaseRepository } from '../../src/repositories/base';
import { LocationsRepository } from '../../src/repositories/locations';
import { OrdersRepository } from '../../src/repositories/orders';
import { Account } from '../../src/value-objects/account';
import { Dimensions } from '../../src/value-objects/dimensions';
import { Location } from '../../src/value-objects/location';

describe('OrdersRepository', () => {
  describe('#find', () => {
    it('Should return Order', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const locationsRepository: IRepository<Location, number> = new LocationsRepository();

      const ordersRepository: IWritableRepository<Order, string> = new OrdersRepository(
        baseRepository,
        locationsRepository,
      );
      const insertedOrder: Order = new Order(
        uuid.v4(),
        new Account('accountNumber', 'emailAddress', 'name'),
        null,
        false,
        false,
        null,
        false,
        null,
        false,
        null,
        new Location(1, null, null, null),
        new Dimensions(10, 20, 30),
        new Location(1, null, null, null),
        20,
      );

      await ordersRepository.insert(insertedOrder);

      const order: Order = await ordersRepository.find(insertedOrder.id);

      expect(order).to.be.not.null;
    });
  });

  describe('#findAll', () => {
    it('Should return Orders', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const locationsRepository: IRepository<Location, number> = new LocationsRepository();

      const ordersRepository: IWritableRepository<Order, string> = new OrdersRepository(
        baseRepository,
        locationsRepository,
      );

      const insertedOrder: Order = new Order(
        uuid.v4(),
        new Account('accountNumber', 'emailAddress', 'name'),
        null,
        false,
        false,
        null,
        false,
        null,
        false,
        null,
        new Location(1, null, null, null),
        new Dimensions(10, 20, 30),
        new Location(1, null, null, null),
        20,
      );

      await ordersRepository.insert(insertedOrder);

      const orders: Order[] = await ordersRepository.findAll();

      expect(orders.length).to.be.eq(1);
    });
  });

  describe('#insert', () => {
    it('Should insert Order', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const locationsRepository: IRepository<Location, number> = new LocationsRepository();

      const ordersRepository: IWritableRepository<Order, string> = new OrdersRepository(
        baseRepository,
        locationsRepository,
      );

      const order: Order = new Order(
        uuid.v4(),
        new Account('accountNumber', 'emailAddress', 'name'),
        null,
        false,
        false,
        null,
        false,
        null,
        false,
        null,
        new Location(1, null, null, null),
        new Dimensions(10, 20, 30),
        new Location(1, null, null, null),
        20,
      );

      await ordersRepository.insert(order);
    });
  });

  describe('#update', () => {
    it('Should update Order', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const locationsRepository: IRepository<Location, number> = new LocationsRepository();

      const ordersRepository: IWritableRepository<Order, string> = new OrdersRepository(
        baseRepository,
        locationsRepository,
      );

      const order: Order = new Order(
        uuid.v4(),
        new Account('accountNumber', 'emailAddress', 'name'),
        null,
        false,
        false,
        null,
        false,
        null,
        false,
        null,
        new Location(1, null, null, null),
        new Dimensions(10, 20, 30),
        new Location(1, null, null, null),
        20,
      );

      await ordersRepository.insert(order);

      order.account.accountNumber = 'accountNumber-updated';
      order.account.emailAddress = 'emailAddress-updated';
      order.account.name = 'name-updated';

      await ordersRepository.update(order);
    });
  });
});
