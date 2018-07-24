import { IValueObject } from '../interfaces/value-object';

export class Dimensions implements IValueObject {
  constructor(public height: number, public length: number, public width: number) {}

  public getVolume(): number {
    return this.height * this.length * this.width;
  }
}
