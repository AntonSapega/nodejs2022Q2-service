import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/interfaces/IAlbum';
import { IFavorites } from '../../interfaces/IFavorites';
import { IFavoritesResponse } from 'src/interfaces/IFavoritesResponse';
import { ArtistsDBService } from './artistsDB.service';
import { AlbumsDBService } from './albumsDB.service';
import { TracksDBService } from './tracksDB.service';
import { IArtist } from 'src/interfaces/IArtist';
import { ITrack } from 'src/interfaces/ITrack';

@Injectable()
export class FavoritesDBService {
  constructor(
    private artistsDBService: ArtistsDBService,
    private albumsDBService: AlbumsDBService,
    private tracksDBService: TracksDBService,
  ) {}

  private favoritesDB: IFavorites = {
    artists: [
      '3c923503-1823-47af-afc1-2cfcc604b5db',
      '43fc85b1-724f-4d01-b15d-a74e72332aa8',
    ],
    albums: ['1d6f8455-d03c-4fc5-982c-f5e9462ac3f3'],
    tracks: ['3c923503-1823-47af-afc1-2cfcc604b5db'],
  };

  public async getFavoritesList(): Promise<IFavoritesResponse> {
    const artists: IArtist[] = await this.artistsDBService.getArtistsList();
    const albums: IAlbum[] = await this.albumsDBService.getAlbumsList();
    const tracks: ITrack[] = await this.tracksDBService.getTracksList();

    const favArtists: IArtist[] = this.favoritesDB.artists.reduce(
      (acc, currArtistId) => {
        const favorite: IArtist = artists.find(
          (artist) => artist.id === currArtistId,
        );
        acc.push(favorite);
        return acc;
      },
      [],
    );

    const favAlbums: IAlbum[] = this.favoritesDB.albums.reduce(
      (acc, currAlbumId) => {
        const favorite: IAlbum = albums.find(
          (album) => album.id === currAlbumId,
        );
        acc.push(favorite);
        return acc;
      },
      [],
    );

    const favTracks: ITrack[] = this.favoritesDB.tracks.reduce(
      (acc, currTrackId) => {
        const favorite: ITrack = tracks.find(
          (track) => track.id === currTrackId,
        );
        acc.push(favorite);
        return acc;
      },
      [],
    );

    const favs: IFavoritesResponse = {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };

    return new Promise((resolve) => {
      resolve(favs);
    });
  }

  // public async addFavoriteTracks(trackId: string): Promise<void> {}
}
