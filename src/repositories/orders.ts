import { inject, injectable } from 'inversify';
import { Order } from '../entities/order';
import { IWritableRepository } from '../interfaces/writable-repository';
import { Account } from '../value-objects/account';
import { BaseRepository } from './base';

@injectable()
export class OrderRepository implements IWritableRepository<Order, string> {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {

    }

    public async find(id: string): Promise<Order> {
        const rows: any[] = await this.baseRepository.query(`SELECT * FROM ORDERS WHERE ID = @id`, {
            id,
        });

        if (!rows.length) {
            return null;
        }

        const row: any = rows[0];

        return new Order(
            row.ID,
            new Account(
                row.ACCOUNT_NUMBER,
                row.ACCOUNT_EMAIL_ADDRESS,
                row.ACCOUNT_NAME,
            ),
            row.APPROVED,
            row.CANCELLED,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        );
    }

    public async findAll(): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }

    public async insert(entity: Order): Promise<Order> {
        await this.baseRepository.execute(`INSERT INTO ORDERS (
            ID,
            ACCOUNT_NUMBER,
            ACCOUNT_EMAIL_ADDRESS,
            ACCOUNT_NAME,
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
            '${entity.id}',
            '${entity.account.accountNumber}',
            '${entity.account.emailAddress}',
            '${entity.account.name}',
            ${entity.approved},
            ${entity.cancelled},
            ${entity.collectionTimestamp ? entity.collectionTimestamp.getTime() : null},
            ${entity.confirmed},
            ${entity.cost},
            ${entity.declined},
            ${entity.deliveryTimestamp ? entity.deliveryTimestamp.getTime() : null},
            ${entity.destination.id},
            ${entity.dimensions.height},
            ${entity.dimensions.length},
            ${entity.dimensions.width},
            ${entity.source.id},
            ${entity.weight}
        );
        `);

        return entity;
    }

}
