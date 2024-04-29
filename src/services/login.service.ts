import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtUtils from '../utils/jwt.utils';
import { Login } from '../types/Login';

async function isPasswordValid(username: string, password: string): Promise<boolean> {
  const findUser = await UserModel.findOne({ where: { username } });
  if (!findUser) {
    return false;
  }

  return bcrypt.compare(password, findUser.dataValues.password);
}

async function verifyLogin(login: Login) : Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  const findUser = await UserModel.findOne({ where: { username: login.username } });
  const isValidPassword = await isPasswordValid(login.username, login.password);
  if (!isValidPassword) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  if (!findUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { username, password } = findUser.dataValues;
  const token = jwtUtils.sign({ username, password });
  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};