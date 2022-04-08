import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from "../config";
import { IUserDocument } from "./types";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },

  {
    timestamps: true
  },
);

userSchema.pre('save', async function (next) {
  const user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(config.SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})

userSchema.methods.comparePasswords = function (candidate: string) {
  const user = this as IUserDocument;

  return bcrypt.compareSync(candidate, user.password);
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;