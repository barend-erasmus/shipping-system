import * as express from 'express';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';

export class LocationsRouter {

    public static async get(request: express.Request, response: express.Response): Promise<void> {
        const locationRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>('ILocationRepository');

        const locations: Location[] = await locationRepository.findAll();

        response.json(locations);
    }

}
