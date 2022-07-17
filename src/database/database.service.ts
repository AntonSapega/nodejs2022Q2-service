import { Injectable } from '@nestjs/common';
import { UsersDBService } from './services/usersDB.service';
import { ArtistsDBService } from './services/artistsDB.service';
import { TracksDBService } from './services/tracksDB.service';
import { AlbumsDBService } from './services/albumsDB.service';
import { FavoritesDBService } from './services/favoritesDB.service';

@Injectable()
export class DatabaseService {
  constructor(
    private usersService: UsersDBService,
    private artistsService: ArtistsDBService,
    private tracksService: TracksDBService,
    private albumsService: AlbumsDBService,
    private favoritesService: FavoritesDBService,
  ) {}

  public users: UsersDBService = this.usersService;
  public artists: ArtistsDBService = this.artistsService;
  public tracks: TracksDBService = this.tracksService;
  public albums: AlbumsDBService = this.albumsService;
  public favorites: FavoritesDBService = this.favoritesService;

  public resetDependenciesWithArtistId(artistId: string): void {
    this.tracks.resetArtistId(artistId);
    this.albums.resetArtistId(artistId);
  }

  public resetDependenciesWithAlbumId(albumId: string): void {
    this.tracks.resetAlbumId(albumId);
  }
}
