import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable({ scope: Scope.DEFAULT })
export class ArtistsService {
  constructor(private db: DatabaseService) {}

  public async getArtists(): Promise<IArtist[]> {
    return this.db.artists.getArtistsList();
  }
}
