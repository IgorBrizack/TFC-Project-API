// import ILogin from 'src/interfaces/loginInterface';
import generateToken from '../../jwt/generateToken';
import ILogin from '../../interfaces/loginInterface';
import Users from '../models/Users';

export default class LoginService {
  public model = Users;

  public async login(login:ILogin): Promise<string> {
    const { email, password } = login;
    const hasUser = await this.model.findOne({ where: { email } });

    console.log(hasUser);

    if (hasUser && hasUser.password === password) return generateToken(email);

    return 'no token';
  }
}
