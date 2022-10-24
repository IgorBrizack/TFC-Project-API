import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public bringAllMatches = async (req: Request, res: Response) => {
    console.log('matches controller');
    const allMatchesData = await this.matchesService.findAllMatches();
    res.status(200).json({ message: allMatchesData });
  };
}
