import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public bringAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatchesData = await this.matchesService.findAllMatches();
      return res.status(200).json(allMatchesData);
    }

    let key = true;
    if (inProgress !== 'true') key = false;

    const allMatchesInProgress = await this
      .matchesService.matchesInProgress(key);
    return res.status(200).json(allMatchesInProgress);
  };
}
