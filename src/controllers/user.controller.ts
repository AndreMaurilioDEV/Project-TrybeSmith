import { Request, Response } from 'express';
import usersService from '../services/users.service';

async function getUsers(req: Request, res: Response) {
  try {
    const users = await usersService.listUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
}

export default {
  getUsers,
};