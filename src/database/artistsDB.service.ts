import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsDBService {
  private artistsDB: Array<IArtist> = [
    {
      id: '1',
      name: 'Alex',
      grammy: false,
    },
  ];

  public async getArtistsList(): Promise<IArtist[]> {
    return new Promise((resolve) => {
      resolve(this.artistsDB);
    });
  }
}
