import { IArtist } from 'src/interfaces/IArtist';
import { IAlbum } from 'src/interfaces/IAlbum';
import { ITrack } from 'src/interfaces/ITrack';

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
