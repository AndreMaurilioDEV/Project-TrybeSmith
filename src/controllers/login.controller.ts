import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req: Request, res: Response) : Promise<Response> {
  const { username, password } = req.body;
  const loginUser = await loginService.verifyLogin({ username, password });
  if (loginUser.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(loginUser.status)).json(loginUser.data);
  }
  return res.status(200).json(loginUser.data);
}

export default {
  login,
};