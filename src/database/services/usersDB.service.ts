import { Injectable } from '@nestjs/common';
import { IUser } from '../../interfaces/IUser';

@Injectable()
export class UsersDBService {
  private usersDB: Array<IUser> = [];

  public getUsersList(): Promise<IUser[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.usersDB);
      }, 400);
    });
  }

  public getUser(id: string): Promise<IUser | null> {
    return new Promise((resolve) => {
      const targetUser: IUser | undefined = this.usersDB.find((user: IUser) => {
        return user.id === id;
      });
      if (targetUser) {
        resolve(targetUser);
      } else {
        resolve(null);
      }
    });
  }

  public create(newUser: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      this.usersDB.push(newUser);
      const userResponse = this.prepareUserForResponse(newUser);
      resolve(userResponse);
    });
  }

  public updatePassword(id: string, newPassword: string): Promise<IUser> {
    const user: IUser = this.usersDB.find((user) => user.id === id);
    user.password = newPassword;
    this.updateUser(user);

    return new Promise((resolve) => {
      const shallowCopy: IUser = { ...user };
      delete shallowCopy.password;
      resolve(shallowCopy);
    });
  }

  public remove(id: string): Promise<boolean> {
    const userIdx: number = this.usersDB.findIndex((user) => user.id === id);
    return new Promise((resolve) => {
      if (userIdx !== -1) {
        this.usersDB.splice(userIdx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  // PRIVATE
  private prepareUserForResponse(user: IUser): IUser {
    const shallowCopy: IUser = { ...user };
    delete shallowCopy.password;
    return shallowCopy;
  }

  private updateUser(user: IUser) {
    user.version++;
    user.updatedAt = Date.now();
  }
}
