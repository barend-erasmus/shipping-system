import { IValueObject } from '../interfaces/value-object';

export class Location implements IValueObject {

    constructor(
        public id: number,
        public name: string,
    ) {

    }

}
