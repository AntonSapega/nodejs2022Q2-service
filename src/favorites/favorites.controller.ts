import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IFavoritesResponse } from 'src/interfaces/IFavoritesResponse';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(): Promise<IFavoritesResponse> {
    return this.favoritesService.getFavorites();
  }
}
