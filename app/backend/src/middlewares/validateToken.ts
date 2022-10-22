import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const validateToken = (req:Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  try {
    const payload = jwt.verify(authorization, secret);
    req.user = payload as string;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

export default validateToken;
