import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';
import config from './../config/index';

export function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  const decoded = verifyJwt(
    token || '',
    config.ACCESS_SECRET_KEY
  );

  if (!decoded) {
    return res.status(403).send('Access token is not valid');
  }

  next();
}