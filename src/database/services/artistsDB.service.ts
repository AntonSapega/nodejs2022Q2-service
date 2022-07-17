import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/interfaces/IArtist';
import { TracksDBService } from './tracksDB.service';

@Injectable()
export class ArtistsDBService {
  constructor(private tracksDbService: TracksDBService) {}
  private artistsDB: Array<IArtist> = [
    {
      id: '3c923503-1823-47af-afc1-2cfcc604b5db',
      name: 'Metallica',
      grammy: false,
    },
  ];

  public async getArtistsList(): Promise<IArtist[]> {
    return new Promise((resolve) => {
      resolve(this.artistsDB);
    });
  }

  public async getArtist(id: string): Promise<IArtist | null> {
    return new Promise((resolve) => {
      const artist: IArtist | undefined = this.artistsDB.find(
        (artist) => artist.id === id,
      );
      if (artist) {
        resolve(artist);
      } else {
        resolve(null);
      }
    });
  }

  public async createNewArtist(newArtist: IArtist): Promise<IArtist> {
    this.artistsDB.push(newArtist);
    return new Promise((resolve) => {
      resolve(newArtist);
    });
  }

  public async updateArtist(incomingArtist: IArtist): Promise<IArtist> {
    const artist: IArtist = this.artistsDB.find((artist) => {
      return artist.id === incomingArtist.id;
    });

    incomingArtist.grammy !== undefined
      ? (artist.grammy = incomingArtist.grammy)
      : null;
    incomingArtist.name ? (artist.name = incomingArtist.name) : null;

    return new Promise((resolve) => {
      resolve(artist);
    });
  }

  public remove(id: string): Promise<boolean> {
    const userIdx: number = this.artistsDB.findIndex((user) => user.id === id);
    return new Promise((resolve) => {
      if (userIdx !== -1) {
        this.artistsDB.splice(userIdx, 1);
        // this.tracksDbService.resetArtistId(id);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
