import {
  Injectable,
  Scope,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { NewUser } from './utils/create-user';
import { IUser } from '../interfaces/IUser';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(private db: DatabaseService) {}

  public async getAll(): Promise<IUser[]> {
    return this.db.users.getUsersList();
  }

  public async getUser(id: string): Promise<IUser> {
    const isUuid = uuidValidate(id);
    const user: IUser = await this.db.users.getUser(id);

    if (!isUuid) {
      throw new BadRequestException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    if (isUuid && user) {
      return user;
    }
  }

  public async createUser(userInfo: CreateUserDto): Promise<IUser> {
    if (this.isValidNewUserInfo(userInfo)) {
      const newUser = new NewUser(userInfo);
      return this.db.users.create(newUser);
    }
    throw new BadRequestException();
  }

  public async updatePassword(
    id: string,
    updateData: UpdatePasswordDto,
  ): Promise<IUser> {
    const user: IUser = await this.db.users.getUser(id);

    if (!uuidValidate(id) || !this.isValidUpdatePasswordDto(updateData)) {
      throw new BadRequestException();
    }

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updateData.oldPassword) {
      throw new ForbiddenException();
    }

    return this.db.users.updatePassword(id, updateData.newPassword);
  }

  public async deleteUser(id: string): Promise<void> {
    const result = await this.db.users.remove(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!result) {
      throw new NotFoundException();
    }
  }

  private isValidNewUserInfo(info: any): boolean {
    if ('login' in info && 'password' in info) {
      return true;
    }
    return false;
  }

  private isValidUpdatePasswordDto(dto: UpdatePasswordDto): boolean {
    if ('oldPassword' in dto && 'newPassword' in dto) {
      return true;
    }
    return false;
  }
}
