import { omit } from "lodash";
import { IUser, IUserDocument } from "../model/types";
import UserModel from "../model/user.model";

export function createUserService(userData: IUser) {
  return UserModel.create(userData);
}

export async function validatePasswordService(
  username: string,
  password: string
) {
  const user = await UserModel.findOne({ username }) as IUserDocument;
  if (!user) return false;

  const isValid = user.comparePasswords(password);
  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export function findUserService(id: string) {
  return UserModel.findOne({ _id: id });
}