import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/interfaces/IArtist';
import { ITrack } from 'src/interfaces/ITrack';

@Injectable()
export class TracksDBService {
  private tracksDB: Array<ITrack> = [
    {
      id: '3c923503-1823-47af-afc1-2cfcc604b5db',
      name: 'Billie Jean',
      artistId: null, // refers to Artist
      albumId: null, // refers to Album
      duration: 2654,
    },
  ];

  public async getTracksList(): Promise<ITrack[]> {
    return new Promise((resolve) => {
      resolve(this.tracksDB);
    });
  }

  public async getTrack(id: string): Promise<ITrack | null> {
    return new Promise((resolve) => {
      const track: ITrack | undefined = this.tracksDB.find(
        (track) => track.id === id,
      );
      if (track) {
        resolve(track);
      } else {
        resolve(null);
      }
    });
  }

  public async createNewTrack(newTrack: ITrack): Promise<ITrack> {
    this.tracksDB.push(newTrack);
    return new Promise((resolve) => {
      resolve(newTrack);
    });
  }

  public async updateTrack(incomingTrack: ITrack): Promise<ITrack> {
    const track: ITrack = this.tracksDB.find((track) => {
      return track.id === incomingTrack.id;
    });

    incomingTrack.name !== undefined ? (track.name = incomingTrack.name) : null;
    incomingTrack.artistId !== undefined
      ? (track.artistId = incomingTrack.artistId)
      : null;
    incomingTrack.albumId !== undefined
      ? (track.albumId = incomingTrack.albumId)
      : null;
    incomingTrack.duration !== undefined
      ? (track.duration = incomingTrack.duration)
      : null;

    return new Promise((resolve) => {
      resolve(track);
    });
  }

  public remove(id: string): Promise<boolean> {
    const userIdx: number = this.tracksDB.findIndex((user) => user.id === id);
    return new Promise((resolve) => {
      if (userIdx !== -1) {
        this.tracksDB.splice(userIdx, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public resetArtistId(artistIdx: string): void {
    const track: ITrack = this.tracksDB.find((track) => {
      return track.artistId === artistIdx;
    });
    track.artistId = null;
  }
}
