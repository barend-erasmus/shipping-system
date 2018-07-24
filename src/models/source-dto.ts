import { Location } from '../value-objects/location';

export class SourceDTO {
  constructor(public id: number, public name: string) {}

  public static fromValueObject(location: Location): SourceDTO {
    if (!location) {
      return null;
    }

    return new SourceDTO(location.id, location.name);
  }

  public toValueObject(): Location {
    return new Location(this.id, null, null, this.name);
  }
}
