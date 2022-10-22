// import ILogin from 'src/interfaces/loginInterface';
import ILogin from 'src/interfaces/loginInterface';
import Users from '../models/Users';

export default class LoginService {
  public model = Users;

  public async login(login:ILogin): Promise<boolean> {
    const { email, password } = login;
    const hasUser = await this.model.findAll({ where: { email } });

    if (!hasUser) {
      await this.model.create({ email, password });
      return true;
    }
    return false;
  }
}
