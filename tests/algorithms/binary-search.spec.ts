import { expect } from 'chai';
import { BinarySearchAlgorithm } from '../../src/algorithms/binary-search';

describe('BinarySearchAlgorithm', () => {
  describe('#search', () => {
    it('Should return 5', async () => {
      const data: number[] = [1, 3, 5, 7, 9, 11];

      const result: { index: number; obj: number } = BinarySearchAlgorithm.search<number>(
        data,
        5,
        (a: number, b: number) => {
          return a < b ? -1 : a > b ? 1 : 0;
        },
      );

      expect(result.obj).to.be.eq(5);
    });
  });
});
