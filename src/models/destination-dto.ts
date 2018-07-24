import { Location } from '../value-objects/location';

export class DestinationDTO {
  constructor(public id: number, public name: string) {}

  public static fromValueObject(location: Location): DestinationDTO {
    if (!location) {
      return null;
    }

    return new DestinationDTO(location.id, location.name);
  }

  public toValueObject(): Location {
    return new Location(this.id, null, null, this.name);
  }
}
