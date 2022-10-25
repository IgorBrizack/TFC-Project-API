import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public getHomeLeaderBoard = async (req: Request, res: Response) => {
    const homeLeaderBoardData = await this.leaderBoardService.getHomeLeaderBoard();

    res.status(200).json(homeLeaderBoardData);
  };

  public getAwayLeaderBoard = async (req: Request, res: Response) => {
    const awayLeaderBoardData = await this.leaderBoardService.getAwayLeaderBoard();

    res.status(200).json(awayLeaderBoardData);
  };

  public getLeaderBoard = async (req: Request, res: Response) => {
    const leaderBoard = await this.leaderBoardService.leaderBoard();

    res.status(200).json(leaderBoard);
  };
}
