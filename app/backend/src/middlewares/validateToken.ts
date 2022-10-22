import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (req:Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  try {
    const payload = jwt.verify(authorization, secret);
    req.body = { payload };
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

export default validateToken;
