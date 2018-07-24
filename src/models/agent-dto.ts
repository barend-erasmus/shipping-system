import { Agent } from '../entities/agent';

export class AgentDTO {
  constructor(public id: string, public emailAddress: string, public name: string) {}

  public static fromValueObject(agent: Agent): AgentDTO {
    if (!agent) {
      return null;
    }

    return new AgentDTO(agent.id, agent.emailAddress, agent.name);
  }

  public toEntity(): Agent {
    return new Agent(this.id, this.emailAddress, this.name);
  }
}
