import { Order } from '../entities/order';
import { DestinationDTO } from './destination-dto';
import { DimensionsDTO } from './dimensions-dto';
import { SourceDTO } from './source-dto';

export class OrderDTO {

    constructor(
        public id: string,
        public density: number,
        public destination: DestinationDTO,
        public dimensions: DimensionsDTO,
        public source: SourceDTO,
        public weight: number,
    ) {
    }

    public static fromEntity(order: Order): OrderDTO {
        if (!order) {
            return null;
        }

        return new OrderDTO(
            order.id,
            order.getDensity(),
            DestinationDTO.fromValueObject(order.destination),
            DimensionsDTO.fromValueObject(order.dimensions),
            SourceDTO.fromValueObject(order.source),
            order.weight,
        );
    }

    public static fromRequestBody(body: any): OrderDTO {
        if (!body) {
            return null;
        }

        const dimensionsDto: DimensionsDTO = OrderDTO.parseDimensions(body.dimensions);

        if (!dimensionsDto) {
            return null;
        }

        const orderDto: OrderDTO = new OrderDTO(
            body.id,
            null,
            new DestinationDTO(parseInt(body.destinationId, 10), null),
            dimensionsDto,
            new SourceDTO(parseInt(body.sourceId, 10), null),
            parseFloat(body.weight),
        );

        const order: Order = orderDto.toEntity();

        return OrderDTO.fromEntity(order);
    }

    protected static parseDimensions(dimensions: string): DimensionsDTO {
        if (!dimensions) {
            return null;
        }

        const splittedDimensions: string[] = dimensions.split(',');

        if (splittedDimensions.length !== 3) {
            return null;
        }

        const length: string = splittedDimensions[0];

        const width: string = splittedDimensions[1];

        const height: string = splittedDimensions[2];

        if (isNaN(length as any)) {
            return null;
        }

        if (isNaN(width as any)) {
            return null;
        }

        if (isNaN(height as any)) {
            return null;
        }

        return new DimensionsDTO(parseFloat(height), parseFloat(length), null, parseFloat(width));
    }

    public toEntity(): Order {
        return new Order(
            this.id,
            this.destination.toValueObject(),
            this.dimensions.toValueObject(),
            this.source.toValueObject(),
            this.weight,
        );
    }

}
