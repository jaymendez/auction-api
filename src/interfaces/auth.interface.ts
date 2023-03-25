import { User } from '@interfaces/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number | string;
}

export interface RequestWithUser extends Request {
  user: User;
}
