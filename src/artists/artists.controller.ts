import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<IArtist[]> {
    return this.artistsService.getArtists();
  }
}
