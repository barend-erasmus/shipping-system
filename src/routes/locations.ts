import * as express from 'express';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';

export class LocationsRouter {

    public static async get(request: express.Request, response: express.Response): Promise<void> {
        const locationsRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>('ILocationsRepository');

        const locations: Location[] = await locationsRepository.findAll();

        response.json(locations);
    }

}
