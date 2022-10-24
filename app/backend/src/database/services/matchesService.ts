// import IMatches from '../../interfaces/matchesInterface';
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
}
