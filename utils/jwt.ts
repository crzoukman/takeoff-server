import jwt from 'jsonwebtoken';
import config from '../config';

export function signJwt(
  payload: Object,
  key: string,
  options?: jwt.SignOptions | undefined
) {

  return jwt.sign(
    payload,
    key,
    {
      ...(options && options),
    }
  );
}

export function verifyJwt<T>(token: string, key: string): T | null {

  try {
    const decoded = jwt.verify(token, key) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}