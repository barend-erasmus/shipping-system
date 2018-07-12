import { inject, injectable } from 'inversify';
import { Agent } from '../entities/agent';
import { Order } from '../entities/order';
import { IRepository } from '../interfaces/repository';
import { IWritableRepository } from '../interfaces/writable-repository';
import { Account } from '../value-objects/account';
import { Dimensions } from '../value-objects/dimensions';
import { Location } from '../value-objects/location';
import { BaseRepository } from './base';

@injectable()
export class OrdersRepository implements IWritableRepository<Order, string> {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
        @inject('LocationsRepository')
        protected locationsRepository: IRepository<Location, number>,
    ) {

    }

    public async find(id: string): Promise<Order> {
        const rows: any[] = await this.baseRepository.query(`SELECT * FROM ORDERS WHERE ID = $id`, {
            $id: id,
        });

        if (!rows.length) {
            return null;
        }

        const row: any = rows[0];

        const order: Order = new Order(
            row.ID,
            new Account(
                row.ACCOUNT_NUMBER,
                row.ACCOUNT_EMAIL_ADDRESS,
                row.ACCOUNT_NAME,
            ),
            new Agent(row.AGENT_ID, null, null),
            row.APPROVED ? true : false,
            row.CANCELLED ? true : false,
            row.COLLECTION_TIMESTAMP ? new Date(row.COLLECTION_TIMESTAMP) : null,
            row.CONFIRMED ? true : false,
            row.COST,
            row.DECLINED ? true : false,
            row.DELIVERY_TIMESTAMP ? new Date(row.DELIVERY_TIMESTAMP) : null,
            new Location(row.DESTINATION_ID, null, null, null),
            new Dimensions(row.HEIGHT, row.LENGTH, row.WIDTH),
            new Location(row.SOURCE_ID, null, null, null),
            row.WEIGHT,
        );

        await this.loadSourceAndDestination(order);

        return order;
    }

    public async findAll(): Promise<Order[]> {
        const rows: any[] = await this.baseRepository.query(`SELECT * FROM ORDERS`, undefined);

        const orders: Order[] = rows.map((row: any) => new Order(
            row.ID,
            new Account(
                row.ACCOUNT_NUMBER,
                row.ACCOUNT_EMAIL_ADDRESS,
                row.ACCOUNT_NAME,
            ),
            new Agent(row.AGENT_ID, null, null),
            row.APPROVED ? true : false,
            row.CANCELLED ? true : false,
            row.COLLECTION_TIMESTAMP ? new Date(row.COLLECTION_TIMESTAMP) : null,
            row.CONFIRMED ? true : false,
            row.COST,
            row.DECLINED ? true : false,
            row.DELIVERY_TIMESTAMP ? new Date(row.DELIVERY_TIMESTAMP) : null,
            new Location(row.DESTINATION_ID, null, null, null),
            new Dimensions(row.HEIGHT, row.LENGTH, row.WIDTH),
            new Location(row.SOURCE_ID, null, null, null),
            row.WEIGHT,
        ));

        for (const order of orders as any) {
            await this.loadSourceAndDestination(order);
        }

        return orders;
    }

    public async insert(entity: Order): Promise<Order> {
        await this.baseRepository.execute(`INSERT INTO ORDERS (
            ID,
            ACCOUNT_NUMBER,
            ACCOUNT_EMAIL_ADDRESS,
            ACCOUNT_NAME,
            AGENT_ID,
            APPROVED,
            CANCELLED,
            COLLECTION_TIMESTAMP,
            CONFIRMED,
            COST,
            DECLINED,
            DELIVERY_TIMESTAMP,
            DESTINATION_ID,
            HEIGHT,
            LENGTH,
            WIDTH,
            SOURCE_ID,
            WEIGHT
        ) VALUES (
            ${this.baseRepository.valueToString(entity.id)},
            ${this.baseRepository.valueToString(entity.account.accountNumber)},
            ${this.baseRepository.valueToString(entity.account.emailAddress)},
            ${this.baseRepository.valueToString(entity.account.name)},
            ${this.baseRepository.valueToString(entity.agent ? `'${entity.agent.id}'` : null)},
            ${this.baseRepository.valueToString(entity.approved)},
            ${this.baseRepository.valueToString(entity.cancelled)},
            ${this.baseRepository.valueToString(entity.collectionTimestamp ? entity.collectionTimestamp.getTime() : null)},
            ${this.baseRepository.valueToString(entity.confirmed)},
            ${this.baseRepository.valueToString(entity.cost)},
            ${this.baseRepository.valueToString(entity.declined)},
            ${this.baseRepository.valueToString(entity.deliveryTimestamp ? entity.deliveryTimestamp.getTime() : null)},
            ${this.baseRepository.valueToString(entity.destination.id)},
            ${this.baseRepository.valueToString(entity.dimensions.height)},
            ${this.baseRepository.valueToString(entity.dimensions.length)},
            ${this.baseRepository.valueToString(entity.dimensions.width)},
            ${this.baseRepository.valueToString(entity.source.id)},
            ${this.baseRepository.valueToString(entity.weight)}
        );
        `);

        return entity;
    }

    public async update(entity: Order): Promise<Order> {
        await this.baseRepository.execute(`UPDATE ORDERS SET
            ACCOUNT_NUMBER = ${this.baseRepository.valueToString(entity.account.accountNumber)},
            ACCOUNT_EMAIL_ADDRESS = ${this.baseRepository.valueToString(entity.account.emailAddress)},
            ACCOUNT_NAME = ${this.baseRepository.valueToString(entity.account.name)},
            AGENT_ID = ${this.baseRepository.valueToString(entity.agent ? entity.agent.id : null)},
            APPROVED = ${this.baseRepository.valueToString(entity.approved)},
            CANCELLED = ${this.baseRepository.valueToString(entity.cancelled)},
            COLLECTION_TIMESTAMP = ${this.baseRepository.valueToString(entity.collectionTimestamp ? entity.collectionTimestamp.getTime() : null)},
            CONFIRMED =  ${this.baseRepository.valueToString(entity.confirmed)},
            COST = ${this.baseRepository.valueToString(entity.cost)},
            DECLINED = ${this.baseRepository.valueToString(entity.declined)},
            DELIVERY_TIMESTAMP = ${this.baseRepository.valueToString(entity.deliveryTimestamp ? entity.deliveryTimestamp.getTime() : null)},
            DESTINATION_ID = ${this.baseRepository.valueToString(entity.destination.id)},
            HEIGHT = ${this.baseRepository.valueToString(entity.dimensions.height)},
            LENGTH = ${this.baseRepository.valueToString(entity.dimensions.length)},
            WIDTH = ${this.baseRepository.valueToString(entity.dimensions.width)},
            SOURCE_ID = ${this.baseRepository.valueToString(entity.source.id)},
            WEIGHT = ${this.baseRepository.valueToString(entity.weight)}
            WHERE ID = ${this.baseRepository.valueToString(entity.id)}
        `);

        return entity;
    }

    protected async loadSourceAndDestination(order: Order): Promise<Order> {
        order.source = order.source ? await this.locationsRepository.find(order.source.id) : null;

        order.destination = order.source ? await this.locationsRepository.find(order.destination.id) : null;

        return order;
    }

}
