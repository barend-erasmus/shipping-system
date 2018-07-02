import { expect } from 'chai';
import * as sinon from 'sinon';
import * as supertest from 'supertest';
import { app } from '../../src/app';
import { IRepository } from '../../src/interfaces/repository';
import { Location } from '../../src/value-objects/location';
import { getContainer, resetContainer } from './../../src/ioc';

describe('LocationsRouter', () => {

    describe('#get', () => {

        beforeEach(() => {
            resetContainer();
        });

        it('Should call Locations Repository', async () => {
            getContainer().unbind('ILocationRepository');

            const locationRepository: IRepository<Location, number> = {
                findAll: async () => {
                    return null;
                },
            } as IRepository<Location, number>;

            getContainer().bind<IRepository<Location, number>>('ILocationRepository').toConstantValue(locationRepository);

            const locationRepositoryFindAllSpy: sinon.SinonSpy = sinon.spy(locationRepository, 'findAll');

            supertest(app)
                .get('/api/locations')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((error: Error, response: any) => {
                    if (error) {
                        throw error;
                    }

                    expect(locationRepositoryFindAllSpy.calledOnce).to.be.true;
                });
        });

    });

});
