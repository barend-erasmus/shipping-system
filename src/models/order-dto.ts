import { DestinationDTO } from './destination-dto';
import { DimensionsDTO } from './dimensions-dto';
import { SourceDTO } from './source-dto';

export class OrderDTO {

    public density: number = null;

    constructor(
        public id: string,
        public destination: DestinationDTO,
        public dimensions: DimensionsDTO,
        public source: SourceDTO,
        public weight: number,
    ) {
        this.density = this.weight / this.dimensions.volume;
    }

    public static fromRequestBody(body: any): OrderDTO {
        const splittedDimensions: string[] = body.dimensions.split(',');

        if (splittedDimensions.length !== 3) {
            return null;
        }

        return new OrderDTO(
            body.id,
            new DestinationDTO(parseInt(body.destinationId, 10), null),
            new DimensionsDTO(parseFloat(splittedDimensions[2]), parseFloat(splittedDimensions[0]), parseFloat(splittedDimensions[1])),
            new SourceDTO(parseInt(body.sourceId, 10), null),
            parseFloat(body.weight),
        );
    }

}
