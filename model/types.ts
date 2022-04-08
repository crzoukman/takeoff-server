import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IContact {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
  comparePasswords(candidatePassword: string): boolean;
}