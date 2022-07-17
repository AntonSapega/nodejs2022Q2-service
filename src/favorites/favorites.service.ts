import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IFavoritesResponse } from 'src/interfaces/IFavoritesResponse';

@Injectable()
export class FavoritesService {
  constructor(private db: DatabaseService) {}

  public async getFavorites(): Promise<IFavoritesResponse> {
    return this.db.favorites.getFavoritesList();
  }

  public async addTrack(trackId: string): Promise<void> {
    // this.db.favorites.addFavoriteTrack(trackId);
  }
}
