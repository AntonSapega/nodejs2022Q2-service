import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from 'src/interfaces/IArtist';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<IArtist[]> {
    return this.artistsService.getArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtist(@Param('id') id: string) {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
