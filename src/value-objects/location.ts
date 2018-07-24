import { IValueObject } from '../interfaces/value-object';

export class Location implements IValueObject {
  constructor(public id: number, public latitude: number, public longitude: number, public name: string) {}
}
