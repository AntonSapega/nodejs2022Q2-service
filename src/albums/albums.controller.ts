import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { IAlbum } from '../interfaces/IAlbum';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<IAlbum[]> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbum(@Param('id') id: string): Promise<IAlbum> {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateAlbumDto): Promise<IAlbum> {
    return this.albumsService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return this.albumsService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.albumsService.deleteAlbum(id);
  }
}
