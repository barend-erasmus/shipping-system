export class NumericHelper {

    public static round(value: number, decimalPlaces: number): number {
        return Math.round(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    }

}
