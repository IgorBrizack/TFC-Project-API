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
}
