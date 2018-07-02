import { expect } from 'chai';
import { DimensionsDTO } from '../../src/models/dimensions-dto';
import { Dimensions } from '../../src/value-objects/dimensions';

describe('DimensionsDTO', () => {

    describe('#fromValueObject', () => {

        it('Should return DimensionsDTO', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(new Dimensions(10, 20, 30));

            expect(result).to.be.not.null;
        });

        it('Should return null given null', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(null);

            expect(result).to.be.null;
        });

        it('Should return DimensionsDTO with correct height', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(new Dimensions(10, 20, 30));

            expect(result.height).to.be.eq(10);
        });

        it('Should return DimensionsDTO with correct length', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(new Dimensions(10, 20, 30));

            expect(result.length).to.be.eq(20);
        });

        it('Should return DimensionsDTO with correct volume', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(new Dimensions(10, 20, 30));

            expect(result.volume).to.be.eq(6000);
        });

        it('Should return DimensionsDTO with correct width', () => {
            const result: DimensionsDTO = DimensionsDTO.fromValueObject(new Dimensions(10, 20, 30));

            expect(result.width).to.be.eq(30);
        });

    });

    describe('#toValueObject', () => {

        it('Should return Dimensions', () => {
            const dimensionsDTO = new DimensionsDTO(10, 20, null, 30);

            const result: Dimensions = dimensionsDTO.toValueObject();

            expect(result).to.be.not.null;
        });

        it('Should return Dimensions with correct height', () => {
            const dimensionsDTO = new DimensionsDTO(10, 20, null, 30);

            const result: Dimensions = dimensionsDTO.toValueObject();

            expect(result.height).to.be.eq(10);
        });

        it('Should return Dimensions with correct length', () => {
            const dimensionsDTO = new DimensionsDTO(10, 20, null, 30);

            const result: Dimensions = dimensionsDTO.toValueObject();

            expect(result.length).to.be.eq(20);
        });

        it('Should return Dimensions with correct width', () => {
            const dimensionsDTO = new DimensionsDTO(10, 20, null, 30);

            const result: Dimensions = dimensionsDTO.toValueObject();

            expect(result.width).to.be.eq(30);
        });

    });

});
