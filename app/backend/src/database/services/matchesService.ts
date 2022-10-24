// import IMatches from '../../interfaces/matchesInterface';
import Matches from '../models/Matches';

export default class MatchesService {
  public model = Matches;

  public async findAllMatches(): Promise<string> {
    const matchesData = await this.model.findAll({ raw: true });
    console.log(matchesData);
    return 'teamsData';
  }
}
