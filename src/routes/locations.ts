import * as express from 'express';
import { RequestHelper } from '../helpers/request';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';
import { Location } from '../value-objects/location';

export class LocationsRouter {
  public static async get(request: express.Request, response: express.Response): Promise<void> {
    const locationsRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>(
      'LocationsRepository',
    );

    const locations: Location[] = await locationsRepository.findAll();

    RequestHelper.sendResponse(request, response, locations);
  }
}
