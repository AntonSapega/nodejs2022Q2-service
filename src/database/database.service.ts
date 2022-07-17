import { Injectable } from '@nestjs/common';
import { UsersDBService } from './usersDB.service';
import { ArtistsDBService } from './artistsDB.service';

@Injectable()
export class DatabaseService {
  constructor(
    private usersService: UsersDBService,
    private artistsService: ArtistsDBService,
  ) {}

  public users: UsersDBService = this.usersService;
  public artists: ArtistsDBService = this.artistsService;
}
