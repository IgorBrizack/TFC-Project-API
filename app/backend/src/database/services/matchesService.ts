import INewMatch from '../../interfaces/newMatchInterface';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesService {
  public model = Matches;

  public async findAllMatches(): Promise<Matches[]> {
    const matchesData = await this.model.findAll({
      include: [{ model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] } },
      { model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] } }] });

    return matchesData;
  }

  public async matchesInProgress(condition:boolean): Promise<Matches[]> {
    const matchesInProgressData = await this.model.findAll({
      where: { inProgress: condition },
      include: [{ model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] } },
      { model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] } }],
    });
    return matchesInProgressData;
  }

  public async insertNewMatch(match:INewMatch): Promise<Matches> {
    const newMatchInsert = await this.model.create({ ...match, inProgress: true });
    return newMatchInsert;
  }

  public async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateTeamScore(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
