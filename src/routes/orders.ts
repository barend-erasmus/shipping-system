import * as express from 'express';
import * as uuid from 'uuid';
import { ApproveOrderCommand } from '../commands/approve-order';
import { CancelOrderCommand } from '../commands/cancel-order';
import { ConfirmOrderCommand } from '../commands/confirm-order';
import { DeclineOrderCommand } from '../commands/decline-order';
import { PlaceOrderCommand } from '../commands/place-order';
import { Order } from '../entities/order';
import { ICommand } from '../interfaces/command';
import { ICommandBusClient } from '../interfaces/command-bus-client';
import { IRepository } from '../interfaces/repository';
import { getContainer } from '../ioc';
import { OrderDTO } from '../models/order-dto';
import { Location } from '../value-objects/location';

export class OrdersRouter {

    // TODO: Unit Tests
    public static async approve(request: express.Request, response: express.Response): Promise<void> {
        const approveOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('ApproveOrderCommandBusClient');

        const approveOrderCommand: ICommand = new ApproveOrderCommand(uuid.v4(), request.query.emailAddress, request.query.orderId);

        await approveOrderCommandBusClient.execute(approveOrderCommand);

        response.json({
            message: 'success',
        });
    }

    // TODO: Unit Tests
    public static async cancel(request: express.Request, response: express.Response): Promise<void> {
        const cancelOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('CancelOrderCommandBusClient');

        const cancelOrderCommand: ICommand = new CancelOrderCommand(uuid.v4(), request.query.orderId);

        await cancelOrderCommandBusClient.execute(cancelOrderCommand);

        response.json({
            message: 'success',
        });
    }

    // TODO: Unit Tests
    public static async confirm(request: express.Request, response: express.Response): Promise<void> {
        const confirmOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('ConfirmOrderCommandBusClient');

        const confirmOrderCommand: ICommand = new ConfirmOrderCommand(uuid.v4(), request.query.orderId);

        await confirmOrderCommandBusClient.execute(confirmOrderCommand);

        response.json({
            message: 'success',
        });
    }

    // TODO: Unit Tests
    public static async decline(request: express.Request, response: express.Response): Promise<void> {
        const declineOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('DeclineOrderCommandBusClient');

        const declineOrderCommand: ICommand = new DeclineOrderCommand(uuid.v4(), request.query.orderId);

        await declineOrderCommandBusClient.execute(declineOrderCommand);

        response.json({
            message: 'success',
        });
    }

    public static async get(request: express.Request, response: express.Response): Promise<void> {
        const ordersRepository: IRepository<Order, string> = getContainer().get<IRepository<Order, string>>('OrdersRepository');

        const orders: Order[] = await ordersRepository.findAll();

        response.json(orders);
    }

    public static async place(request: express.Request, response: express.Response): Promise<void> {
        const placeOrderCommandBusClient: ICommandBusClient = getContainer().get<ICommandBusClient>('PlaceOrderCommandBusClient');

        const locationsRepository: IRepository<Location, number> = getContainer().get<IRepository<Location, number>>('LocationsRepository');

        const order: Order = OrderDTO.fromRequestBody(request.body).toEntity();

        order.id = uuid.v4();

        order.destination = await locationsRepository.find(order.destination.id);
        order.source = await locationsRepository.find(order.source.id);

        const placeOrderCommand: ICommand = new PlaceOrderCommand(uuid.v4(), order);

        await placeOrderCommandBusClient.execute(placeOrderCommand);

        const orderDTO: OrderDTO = OrderDTO.fromEntity(order);

        response.json(orderDTO);
    }

}
