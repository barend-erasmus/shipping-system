import { expect } from 'chai';
import { DestinationDTO } from '../../src/models/destination-dto';
import { Location } from '../../src/value-objects/location';

describe('DestinationDTO', () => {

    describe('#fromValueObject', () => {

        it('Should return DestinationDTO', () => {
            const result: DestinationDTO = DestinationDTO.fromValueObject(new Location(1, null, null, 'name'));

            expect(result).to.be.not.null;
        });

        it('Should return null given null', () => {
            const result: DestinationDTO = DestinationDTO.fromValueObject(null);

            expect(result).to.be.null;
        });

        it('Should return DestinationDTO with correct id', () => {
            const result: DestinationDTO = DestinationDTO.fromValueObject(new Location(1, null, null, 'name'));

            expect(result.id).to.be.eq(1);
        });

        it('Should return DestinationDTO with correct name', () => {
            const result: DestinationDTO = DestinationDTO.fromValueObject(new Location(1, null, null, 'name'));

            expect(result.name).to.be.eq('name');
        });

    });

    describe('#toValueObject', () => {

        it('Should return Location', () => {
            const destinationDTO = new DestinationDTO(1, 'name');

            const result: Location = destinationDTO.toValueObject();

            expect(result).to.be.not.null;
        });

        it('Should return Location with correct id', () => {
            const destinationDTO = new DestinationDTO(1, 'name');

            const result: Location = destinationDTO.toValueObject();

            expect(result.id).to.be.eq(1);
        });

        it('Should return Location with correct id', () => {
            const destinationDTO = new DestinationDTO(1, 'name');

            const result: Location = destinationDTO.toValueObject();

            expect(result.name).to.be.eq('name');
        });

    });

});
