import { Request, Response } from "express";
import { createUserService, findUserService, validatePasswordService } from "../service/auth.service";
import { omit } from 'lodash';
import { signJwt, verifyJwt } from './../utils/jwt';
import config from "../config";
import { IUserDocument } from "../model/types";

export async function createUserController(
  req: Request,
  res: Response
) {
  try {
    const { username, email } = req.body;

    const user = await createUserService({
      ...req.body,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
    });

    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send(e);
    }

    return res.status(500).send(e);
  }
}

export async function loginController(
  req: Request,
  res: Response
) {
  const { username, password } = req.body;

  const user = await validatePasswordService(
    username.toLowerCase(),
    password
  );
  if (!user) return res.sendStatus(401);

  const accessToken = signJwt(
    user,
    config.ACCESS_SECRET_KEY,
    { expiresIn: config.ACCESS_TOKEN_TTL }
  );

  const refreshToken = signJwt(
    user,
    config.REFRESH_SECRET_KEY,
    { expiresIn: config.REFRESH_TOKEN_TTL }
  );

  return res.send({
    accessToken,
    refreshToken,
    id: user._id,
    username: user.username,
  });
}

export async function refreshAccessTokenController(
  req: Request,
  res: Response
) {
  const token = req.headers['x-refresh'] as string;

  const decoded = verifyJwt(
    token || '',
    config.REFRESH_SECRET_KEY
  ) as IUserDocument;

  if (!decoded) {
    return res.status(401).send('Could not refresh access token');
  }

  const user = await findUserService(decoded._id);

  if (!user) {
    return res.status(401).send('Could not refresh access token');
  }

  const accessToken = signJwt(
    omit(user.toJSON(), 'password'),
    config.ACCESS_SECRET_KEY,
    { expiresIn: config.ACCESS_TOKEN_TTL }
  );

  return res.send({ accessToken });
}