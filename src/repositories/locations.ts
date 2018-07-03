import * as fs from 'fs';
import { injectable } from 'inversify';
import { IRepository } from '../interfaces/repository';
import { Location } from '../value-objects/location';

@injectable()
export class LocationRepository implements IRepository<Location, number> {

    public async find(id: number): Promise<Location> {
        return this.getLocations().find((location: Location) => location.id === id);
    }

    public async findAll(): Promise<Location[]> {
        return this.getLocations();
    }

    protected getLocations(): Location[] {
        const content: string = fs.readFileSync('cities.csv', 'utf-8');

        const lines: string[] = content.split('\r\n');

        const locations: Location[] = [];

        for (let index = 0; index < lines.length; index ++) {
            if (index === 0) {
                continue;
            }

            const line: string = lines[index];

            if (!line) {
                continue;
            }

            const columns: string[] = line.split(',');

            locations.push(new Location(
                index,
                parseFloat(columns[2]),
                parseFloat(columns[3]),
                `${columns[0]}, ${columns[5]}`,
            ));
        }

        return locations;
    }

}
