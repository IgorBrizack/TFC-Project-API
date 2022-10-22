import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private userService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    // login route
    const { email, password } = req.body;
    const userDataDetail = await this.userService.login({ email, password });
    if (!userDataDetail) return res.status(404).json({ message: 'User not found' });
    res.status(201).json({ token: userDataDetail });
  };
}
