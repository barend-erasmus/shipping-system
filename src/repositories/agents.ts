import { inject, injectable } from 'inversify';
import { Agent } from '../entities/agent';
import { IRepository } from '../interfaces/repository';
import { BaseRepository } from './base';

@injectable()
export class AgentsRepository implements IRepository<Agent, string> {
  constructor(@inject('BaseRepository') protected baseRepository: BaseRepository) {}

  public async find(id: string): Promise<Agent> {
    const rows: any[] = await this.baseRepository.query(`SELECT * FROM AGENTS WHERE ID = $id`, {
      $id: id,
    });

    if (!rows.length) {
      return null;
    }

    const row: any = rows[0];

    return new Agent(row.ID, row.EMAIL_ADDRESS, row.NAME);
  }

  public async findAll(): Promise<Agent[]> {
    const rows: any[] = await this.baseRepository.query(`SELECT * FROM AGENTS`, undefined);

    return rows.map((row: any) => new Agent(row.ID, row.EMAIL_ADDRESS, row.NAME));
  }
}
