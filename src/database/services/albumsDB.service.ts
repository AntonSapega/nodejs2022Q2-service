import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/interfaces/IAlbum';

@Injectable()
export class AlbumsDBService {
  private albumsDB: Array<IAlbum> = [
    {
      id: '1d6f8455-d03c-4fc5-982c-f5e9462ac3f3',
      name: 'Enter Sandman',
      year: 1986,
      artistId: '3c923503-1823-47af-afc1-2cfcc604b5db',
    },
  ];

  public async getAlbumsList(): Promise<IAlbum[]> {
    return new Promise((resolve) => {
      resolve(this.albumsDB);
    });
  }

  public async getAlbum(id: string): Promise<IAlbum | null> {
    return new Promise((resolve) => {
      const album: IAlbum | undefined = this.albumsDB.find(
        (album) => album.id === id,
      );
      if (album) {
        resolve(album);
      } else {
        resolve(null);
      }
    });
  }

  public async createNewAlbum(newAlbum: IAlbum): Promise<IAlbum> {
    this.albumsDB.push(newAlbum);
    return new Promise((resolve) => {
      resolve(newAlbum);
    });
  }

  public async updateAlbum(incomingAlbum: IAlbum): Promise<IAlbum> {
    const album: IAlbum = this.albumsDB.find((album) => {
      return album.id === incomingAlbum.id;
    });

    incomingAlbum.name !== undefined ? (album.name = incomingAlbum.name) : null;
    incomingAlbum.artistId !== undefined
      ? (album.artistId = incomingAlbum.artistId)
      : null;
    incomingAlbum.year !== undefined ? (album.year = incomingAlbum.year) : null;

    return new Promise((resolve) => {
      resolve(album);
    });
  }

  public remove(id: string): Promise<boolean> {
    const userIdx: number = this.albumsDB.findIndex((album) => album.id === id);
    return new Promise((resolve) => {
      if (userIdx !== -1) {
        this.albumsDB.splice(userIdx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public resetArtistId(artistIdx: string): void {
    const albums: IAlbum[] = this.albumsDB.filter((album) => {
      return album.artistId === artistIdx;
    });
    albums.map((album) => (album.artistId = null));
  }
}
