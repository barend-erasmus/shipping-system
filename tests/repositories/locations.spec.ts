import { expect } from 'chai';
import { IRepository } from '../../src/interfaces/repository';
import { LocationsRepository } from '../../src/repositories/locations';
import { Location } from '../../src/value-objects/location';

describe('AgentsRepository', () => {

    describe('#find', () => {

        it('Should return Location', async () => {
            const locationsRepository: IRepository<Location, number> = new LocationsRepository();

            const location: Location = await locationsRepository.find(1);

            expect(location).to.be.not.null;
        });

        it('Should return Location with correct name', async () => {
            const locationsRepository: IRepository<Location, number> = new LocationsRepository();

            const location: Location = await locationsRepository.find(1);

            expect(location.name).to.be.eq('Qal eh-ye Now, Afghanistan');
        });

    });

    describe('#findAll', () => {

        it('Should return Locations', async () => {
            const locationsRepository: IRepository<Location, number> = new LocationsRepository();

            const locations: Location[] = await locationsRepository.findAll();

            expect(locations.length).to.be.eq(7322);
        });

        it('Should return Locations with correct name', async () => {
            const locationsRepository: IRepository<Location, number> = new LocationsRepository();

            const locations: Location[] = await locationsRepository.findAll();

            expect(locations[0].name).to.be.eq('Qal eh-ye Now, Afghanistan');
        });

    });

});
