import { Dimensions } from '../value-objects/dimensions';

export class DimensionsDTO {
  constructor(public height: number, public length: number, public volume: number, public width: number) {}

  public static fromValueObject(dimensions: Dimensions): DimensionsDTO {
    if (!dimensions) {
      return null;
    }

    return new DimensionsDTO(dimensions.height, dimensions.length, dimensions.getVolume(), dimensions.width);
  }

  public toValueObject(): Dimensions {
    return new Dimensions(this.height, this.length, this.width);
  }
}
