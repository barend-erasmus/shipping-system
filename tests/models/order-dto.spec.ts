import { expect } from 'chai';
import { OrderDTO } from '../../src/models/order-dto';

describe('OrderDTO', () => {
  describe('#fromRequestBody', () => {
    it('Should return OrderDTO', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result).to.be.not.null;
    });

    it('Should return null given null', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody(null);

      expect(result).to.be.null;
    });

    it('Should return OrderDTO with correct account account number', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.account.accountNumber).to.be.eq('accountNumber');
    });

    it('Should return OrderDTO with correct account email address', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.account.emailAddress).to.be.eq('emailAddress');
    });

    it('Should return OrderDTO with correct account name', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.account.name).to.be.eq('name');
    });

    it('Should return OrderDTO with null agent', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.agent).to.be.null;
    });

    it('Should return OrderDTO with correct destination id', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.destination.id).to.be.eq(2);
    });

    it('Should return OrderDTO with correct destination name', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.destination.name).to.be.eq(null);
    });

    it('Should return OrderDTO with correct dimensions height', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.dimensions.height).to.be.eq(30);
    });

    it('Should return OrderDTO with correct dimensions length', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.dimensions.length).to.be.eq(10);
    });

    it('Should return OrderDTO with correct dimensions width', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.dimensions.width).to.be.eq(20);
    });

    it('Should return OrderDTO with correct dimensions volume', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.dimensions.volume).to.be.eq(6000);
    });

    it('Should return OrderDTO with correct source id', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.source.id).to.be.eq(1);
    });

    it('Should return OrderDTO with correct source name', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.source.name).to.be.eq(null);
    });

    it('Should return OrderDTO with correct density', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.density).to.be.eq(0.003);
    });

    it('Should return OrderDTO with correct weight', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result.weight).to.be.eq(20);
    });

    it('Should return OrderDTO given string destination id', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: '2',
        dimensions: '10,20,30',
        sourceId: 1,
        weight: 20,
      });

      expect(result).to.be.not.null;
    });

    it('Should return null given incorrect dimensions format', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10|20|30',
        sourceId: 1,
        weight: 20,
      });

      expect(result).to.be.null;
    });

    it('Should return null given incorrect dimensions format', () => {
      const result: OrderDTO = OrderDTO.fromRequestBody({
        account: {
          accountNumber: 'accountNumber',
          emailAddress: 'emailAddress',
          name: 'name',
        },
        destinationId: 2,
        dimensions: '10 cm,20 cm,30 cm',
        sourceId: 1,
        weight: 20,
      });

      expect(result).to.be.null;
    });
  });
});
