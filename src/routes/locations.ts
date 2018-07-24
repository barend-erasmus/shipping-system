import * as express from 'express';
import * as xml from 'js2xmlparser';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';
import { Location } from '../value-objects/location';

export class LocationsRouter {
  public static async get(request: express.Request, response: express.Response): Promise<void> {
    const locationsRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>(
      'LocationsRepository',
    );

    const locations: Location[] = await locationsRepository.findAll();

    const accept: string = request.get('Accept');

    if (accept === 'application/json') {
      response.json(locations);
    } else if (accept === 'application/xml') {
      response.set('Content-Type', 'application/xml');
      response.send(xml.parse('locations', locations));
    } else {
      response.status(400).end();
    }
  }
}
