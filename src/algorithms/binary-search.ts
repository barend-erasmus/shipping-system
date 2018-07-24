export class BinarySearchAlgorithm {
  public static search<T>(data: T[], obj: T, searchComparator: (a: T, b: T) => number): { index: number; obj: T } {
    if (data.length === 0) {
      return null;
    }

    let maxIndex: number = data.length - 1;
    let minIndex: number = 0;
    let middleIndex: number = Math.floor((maxIndex - minIndex) / 2);

    let middleValue: T = null;

    while (minIndex <= maxIndex) {
      middleValue = data[middleIndex];

      if (searchComparator(middleValue, obj) === -1) {
        minIndex = middleIndex + 1;
      } else if (searchComparator(middleValue, obj) === 0) {
        return {
          index: middleIndex,
          obj: middleValue,
        };
      } else if (searchComparator(middleValue, obj) === 1) {
        maxIndex = middleIndex - 1;
      }

      middleIndex = Math.floor((maxIndex + minIndex) / 2);
    }

    return null;
  }
}
