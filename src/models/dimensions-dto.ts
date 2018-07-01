export class DimensionsDTO {

    public volume: number = null;

    constructor(
        public height: number,
        public length: number,
        public width: number,
    ) {
        this.volume = this.height * this.length * this.width;
    }

}
