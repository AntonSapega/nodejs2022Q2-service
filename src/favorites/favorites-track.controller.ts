import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
} from '@nestjs/common';
import { IFavoritesResponse } from 'src/interfaces/IFavoritesResponse';
import { FavoritesService } from './favorites.service';

@Controller('favs/track')
export class FavoritesTrackController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string): Promise<void> {
    return this.favoritesService.addTrack(id);
  }
}
