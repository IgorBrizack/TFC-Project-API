import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = {
  expiresIn: '7d',
};

const generateToken = (email:string):string => {
  const token = jwt.sign(
    { data: { email } },
    secret,
    jwtConfig,
  );
  return token;
};

export default generateToken;
