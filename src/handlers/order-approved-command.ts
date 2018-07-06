import { injectable } from 'inversify';
import 'reflect-metadata';
import { ICommand } from '../interfaces/command';
import { ICommandHandler } from '../interfaces/command-handler';

@injectable()
export class OrderApprovedCommandHandler implements ICommandHandler {

    constructor() {

    }

    public async handle(command: ICommand): Promise<void> {
    }

}
