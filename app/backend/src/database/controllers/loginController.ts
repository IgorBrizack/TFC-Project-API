import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private userService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    // login route
    const { email, password } = req.body;
    const userDataDetail = await this.userService.login({ email, password });
    if (!userDataDetail) return res.status(401).json({ message: 'Incorrect email or password' });
    res.status(200).json({ token: userDataDetail });
  };

  // public validate = async (req: Request, res: Response) => {
  //   const { payload: { data: email } } = req.body;
  //   const role = await this.userService.loginValidate(email);
  //   res.status(200).json({ message: role });
  // };
}
