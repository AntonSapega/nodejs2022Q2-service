import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { IAlbum } from '../interfaces/IAlbum';
import { NewAlbum } from './utils/create-album';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: DatabaseService) {}

  public async getAlbums(): Promise<IAlbum[]> {
    return this.db.albums.getAlbumsList();
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    const album: IAlbum | null = await this.db.albums.getAlbum(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    if (album) {
      return album;
    }
  }

  public async create(dto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum: IAlbum = new NewAlbum(dto);

    if (!this.isDto<CreateAlbumDto>(dto)) {
      throw new BadRequestException();
    }

    return this.db.albums.createNewAlbum(newAlbum);
  }

  public async update(
    identifier: string,
    dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    const album: IAlbum | null = await this.db.albums.getAlbum(identifier);

    if (!uuidValidate(identifier) || !this.isDto<UpdateAlbumDto>(dto)) {
      throw new BadRequestException();
    }

    if (!album) {
      throw new NotFoundException();
    }

    const incomingAlbumValue: IAlbum = {
      id: identifier,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };

    return this.db.albums.updateAlbum(incomingAlbumValue);
  }

  public async deleteAlbum(id: string): Promise<void> {
    const result: boolean = await this.db.albums.remove(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!result) {
      throw new NotFoundException();
    }
  }

  // PRIVATE
  private isDto<T>(dto: T): boolean {
    if ('name' in dto && 'artistId' in dto && 'year' in dto) {
      return true;
    }
    return false;
  }
}
