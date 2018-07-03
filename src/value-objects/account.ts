import { IValueObject } from '../interfaces/value-object';

export class Account implements IValueObject {

    constructor(
        public accountNumber: string,
        public emailAddress: string,
        public name: string,
    ) {

    }

}
