import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private teamService = new TeamsService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const data = await this.teamService.getAllTeams();

    res.status(200).json(data);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const selectedItem = await this.teamService.getSelectedItem(id);
    res.status(200).json(selectedItem);
  };
}
