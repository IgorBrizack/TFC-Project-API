import ITeam from '../../interfaces/teamsInterface';
import Team from '../models/Teams';

export default class TeamsService {
  public model = Team;

  public async getAllTeams(): Promise<ITeam[]> {
    const teamsData = await this.model.findAll({ raw: true });

    return teamsData;
  }

  public async getSelectedItem(id: string): Promise<ITeam> {
    const itemSelected = await this.model.findByPk(id);

    return itemSelected as ITeam;
  }
}
