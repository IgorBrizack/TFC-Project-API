import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public getLeaderBoard = async (req: Request, res: Response) => {
    const leaderBoardData = await this.leaderBoardService.getLeaderBoard();

    res.status(200).json(leaderBoardData);
  };

  public getAwayLeaderBoard = async (req: Request, res: Response) => {
    const awayLeaderBoardData = await this.leaderBoardService.getAwayLeaderBoard();

    res.status(200).json(awayLeaderBoardData);
  };
}
