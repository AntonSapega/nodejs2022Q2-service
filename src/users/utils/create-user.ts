import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../interfaces/IUser';
import { CreateUserDto } from '../dto/create-user.dto';

export class NewUser implements IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: CreateUserDto) {
    this.id = uuidv4();
    this.login = user.login;
    this.password = user.password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
