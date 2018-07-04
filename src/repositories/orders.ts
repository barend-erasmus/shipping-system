import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { Order } from '../entities/order';
import { IWritableRepository } from '../interfaces/writable-repository';
import { BaseRepository } from './base';

@injectable()
export class OrderRepository implements IWritableRepository<Order, string> {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {

    }

    public async find(id: string): Promise<Order> {
        throw new Error('Method not implemented.');
    }

    public async findAll(): Promise<Order[]> {
        throw new Error('Method not implemented.');
    }

    public async insert(entity: Order): Promise<Order> {
        // this.baseRepository.execute(`INSERT INTO ORDERS (
        //     ID
        //     ACCOUNT_NUMBER,
        //     ACCOUNT_EMAIL_ADDRESS,
        //     ACCOUNT_NAME,
        //     APPROVED,
        //     CANCELLED,
        //     COLLECTION_TIMESTAMP,
        //     CONFIRMED,
        //     COST,
        //     DECLINED,
        //     DELIVERY_TIMESTAMP,
        //     DESTINATION_ID,
        //     HEIGHT,
        //     LENGTH
        //     WIDTH,
        //     SOURCE_ID,
        //     WEIGHT
        // ) VALUES (
        //     '${uuid.v4()}',
        //     '${entity.account.accountNumber}',
        //     '${entity.account.emailAddress}',
        //     '${entity.account.name}',
        //     ${entity.approved},
        //     '${entity.cancelled}',
        //     '${entity.collectionTimestamp.getTime()}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',
        //     '${}',

        // );
        // `);

        return entity;
    }

}
