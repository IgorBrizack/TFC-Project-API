import { NextFunction, Request, Response } from 'express';
import schema from '../Joi/schemas';

const mailAndPasswordValidation = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = schema.schema1.validate(body);
  if (!error) return next();
  return res.status(400).json({ message: error.message });
};

export default mailAndPasswordValidation;
