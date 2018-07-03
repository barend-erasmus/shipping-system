import * as express from 'express';
import * as uuid from 'uuid';
import { PlaceOrderCommand } from '../commands/place-order';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';
import { OrderDTO } from '../models/order-dto';
import { Location } from '../value-objects/location';

export class OrdersRouter {

    public static async place(request: express.Request, response: express.Response): Promise<void> {
        const placeOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('PlaceOrderCommandBusClient');

        const locationRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>('ILocationRepository');

        const order: Order = OrderDTO.fromRequestBody(request.body).toEntity();

        order.id = uuid.v4();

        order.destination = await locationRepository.find(order.destination.id);
        order.source = await locationRepository.find(order.source.id);

        const placeOrderCommand: ICommand = new PlaceOrderCommand(uuid.v4(), order);

        await placeOrderCommandBusClient.execute(placeOrderCommand);

        const orderDTO: OrderDTO = OrderDTO.fromEntity(order);

        response.json(orderDTO);
    }

}
