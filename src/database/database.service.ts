import { Injectable } from '@nestjs/common';
import { UsersDBService } from './services/usersDB.service';
import { ArtistsDBService } from './services/artistsDB.service';
import { TracksDBService } from './services/tracksDB.service';
import { AlbumsDBService } from './services/albumsDB.service';

@Injectable()
export class DatabaseService {
  constructor(
    private usersService: UsersDBService,
    private artistsService: ArtistsDBService,
    private tracksService: TracksDBService,
    private albumsService: AlbumsDBService,
  ) {}

  public users: UsersDBService = this.usersService;
  public artists: ArtistsDBService = this.artistsService;
  public tracks: TracksDBService = this.tracksService;
  public albums: AlbumsDBService = this.albumsService;
}
