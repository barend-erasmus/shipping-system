import * as fs from 'fs';
import { injectable } from 'inversify';
import { BinarySearchAlgorithm } from '../algorithms/binary-search';
import { IRepository } from '../interfaces/repository';
import { Location } from '../value-objects/location';

@injectable()
export class LocationsRepository implements IRepository<Location, number> {

    public async find(id: number): Promise<Location> {
        const locations: Location[] = this.getLocations();

        const result: { index: number, obj: Location } = BinarySearchAlgorithm
            .search<Location>(
                locations,
                new Location(id, null, null, null),
                (a: Location, b: Location) => {
                    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
                });

        return result.obj;
    }

    public async findAll(): Promise<Location[]> {
        return this.getLocations();
    }

    protected getLocations(): Location[] {
        const content: string = fs.readFileSync('cities.csv', 'utf-8');

        const lines: string[] = content.split('\r\n');

        const locations: Location[] = [];

        for (let index = 0; index < lines.length; index++) {
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
