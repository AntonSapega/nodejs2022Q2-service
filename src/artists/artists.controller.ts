import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  getAll() {
    return this.artistsService.getUsers();
  }
}
