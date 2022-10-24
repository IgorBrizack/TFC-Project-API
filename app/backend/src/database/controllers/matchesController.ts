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

  public insertMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const newMatchInserted = await this.matchesService.insertNewMatch({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
    });

    console.log(newMatchInserted);
    res.status(201).json(newMatchInserted);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));

    res.status(200).json({ message: 'Finished' });
  };
}
