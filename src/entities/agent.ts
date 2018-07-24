import { IEntity } from '../interfaces/entity';

export class Agent implements IEntity<string> {
  constructor(public id: string, public emailAddress: string, public name: string) {}
}
