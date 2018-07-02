import { IEntity } from '../interfaces/entity';

export class Agent implements IEntity<string> {

    constructor(
        public id: string,
        public name: string,
        public emailAddress: string,
    ) {

    }

}
