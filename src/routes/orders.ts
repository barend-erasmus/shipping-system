import * as express from 'express';
import * as uuid from 'uuid';
import { OrderDTO } from '../models/order-dto';

export class OrdersRouter {

    public static place(request: express.Request, response: express.Response): void {
        const orderDTO: OrderDTO = OrderDTO.fromRequestBody(request.body);

        orderDTO.id = uuid.v4();

        response.json(orderDTO);
    }

}
