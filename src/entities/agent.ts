import { IEntity } from '../interfaces/entity';
import { Account } from '../value-objects/account';

export class Agent implements IEntity<string> {

    constructor(
        public id: string,
        public account: Account,
        public emailAddress: string,
        public name: string,
    ) {

    }

}
