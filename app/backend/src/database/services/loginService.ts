// import ILogin from 'src/interfaces/loginInterface';
import * as crypto from 'bcryptjs';
import generateToken from '../../jwt/generateToken';
import ILogin from '../../interfaces/loginInterface';
import Users from '../models/Users';

export default class LoginService {
  public model = Users;

  public async login(login:ILogin): Promise<string | boolean> {
    const { email, password } = login;
    const hasUser = await this.model.findOne({ where: { email } });

    if (hasUser && await crypto
      .compare(password, hasUser.getDataValue('password') as string)) return generateToken(email);

    return false;
  }

  public async loginValidate(email: string): Promise<any> {
    const userRole = await this.model.findOne({ where: { email }, raw: true });
    if (!userRole) {
      throw new Error('user not found');
    }
    return userRole.role;
  }
}
