import { DestinationDTO } from './destination-dto';
import { DimensionsDTO } from './dimensions-dto';
import { SourceDTO } from './source-dto';

export class OrderDTO {

    constructor(
        public id: string,
        public destination: DestinationDTO,
        public dimensions: DimensionsDTO,
        public source: SourceDTO,
        public weight: number,
    ) {

    }

    public static fromRequestBody(body: any): OrderDTO {
        const splittedDimensions: string[] = body.dimensions.split(',');

        if (splittedDimensions.length !== 3) {
            return null;
        }

        return new OrderDTO(
            body.id,
            new DestinationDTO(body.destinationId, null),
            new DimensionsDTO(parseFloat(splittedDimensions[2]), parseFloat(splittedDimensions[0]), parseFloat(splittedDimensions[1])),
            new SourceDTO(body.destinationId, null),
            body.weight,
        );
    }

}
