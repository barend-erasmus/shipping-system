import { injectable } from 'inversify';
import { locations } from '../constants/locations';
import { IRepository } from '../interfaces/repository';
import { Location } from '../value-objects/location';

@injectable()
export class LocationRepository implements IRepository<Location, number> {

    public async find(id: number): Promise<Location> {
        return locations.find((location: Location) => location.id === id);
    }

    public async findAll(): Promise<Location[]> {
        return locations;
    }

}
