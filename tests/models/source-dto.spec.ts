import { expect } from 'chai';
import { SourceDTO } from '../../src/models/source-dto';
import { Location } from '../../src/value-objects/location';

describe('SourceDTO', () => {
  describe('#fromValueObject', () => {
    it('Should return SourceDTO', () => {
      const result: SourceDTO = SourceDTO.fromValueObject(new Location(1, null, null, 'name'));

      expect(result).to.be.not.null;
    });

    it('Should return null given null', () => {
      const result: SourceDTO = SourceDTO.fromValueObject(null);

      expect(result).to.be.null;
    });

    it('Should return SourceDTO with correct id', () => {
      const result: SourceDTO = SourceDTO.fromValueObject(new Location(1, null, null, 'name'));

      expect(result.id).to.be.eq(1);
    });

    it('Should return SourceDTO with correct name', () => {
      const result: SourceDTO = SourceDTO.fromValueObject(new Location(1, null, null, 'name'));

      expect(result.name).to.be.eq('name');
    });
  });

  describe('#toValueObject', () => {
    it('Should return Location', () => {
      const sourceDTO = new SourceDTO(1, 'name');

      const result: Location = sourceDTO.toValueObject();

      expect(result).to.be.not.null;
    });

    it('Should return Location with correct id', () => {
      const sourceDTO = new SourceDTO(1, 'name');

      const result: Location = sourceDTO.toValueObject();

      expect(result.id).to.be.eq(1);
    });

    it('Should return Location with correct id', () => {
      const sourceDTO = new SourceDTO(1, 'name');

      const result: Location = sourceDTO.toValueObject();

      expect(result.name).to.be.eq('name');
    });
  });
});
