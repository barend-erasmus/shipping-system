import { expect } from 'chai';
import { Agent } from '../../src/entities/agent';
import { IRepository } from '../../src/interfaces/repository';
import { AgentsRepository } from '../../src/repositories/agents';
import { BaseRepository } from '../../src/repositories/base';

describe('AgentsRepository', () => {
  describe('#find', () => {
    it('Should return Agent', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agent: Agent = await agentsRepository.find('461a3f63-2362-48b9-9522-25b241bd64a7');

      expect(agent).to.be.not.null;
    });

    it('Should return Agent with correct email address', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agent: Agent = await agentsRepository.find('461a3f63-2362-48b9-9522-25b241bd64a7');

      expect(agent.emailAddress).to.be.eq('developersworkspace@gmail.com');
    });

    it('Should return Agent with correct name', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agent: Agent = await agentsRepository.find('461a3f63-2362-48b9-9522-25b241bd64a7');

      expect(agent.name).to.be.eq('Barend Erasmus');
    });
  });

  describe('#findAll', () => {
    it('Should return Agents', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agents: Agent[] = await agentsRepository.findAll();

      expect(agents.length).to.be.eq(1);
    });

    it('Should return Agents with correct email address', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agents: Agent[] = await agentsRepository.findAll();

      expect(agents[0].emailAddress).to.be.eq('developersworkspace@gmail.com');
    });

    it('Should return Agents with correct name', async () => {
      const baseRepository: BaseRepository = new BaseRepository();

      const agentsRepository: IRepository<Agent, string> = new AgentsRepository(baseRepository);

      const agents: Agent[] = await agentsRepository.findAll();

      expect(agents[0].name).to.be.eq('Barend Erasmus');
    });
  });
});
