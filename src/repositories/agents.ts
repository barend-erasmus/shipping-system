import { injectable } from 'inversify';
import { Agent } from '../entities/agent';
import { IRepository } from '../interfaces/repository';

@injectable()
export class AgentsRepository implements IRepository<Agent, string> {

    public async find(id: string): Promise<Agent> {
        throw new Error('Method not implemented.');
    }

    public async findAll(): Promise<Agent[]> {
        throw new Error('Method not implemented.');
    }

}
