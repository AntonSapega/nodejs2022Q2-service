import {
  Injectable,
  Scope,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from 'src/interfaces/IArtist';
import { NewArtist } from './utils/create-artist';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable({ scope: Scope.DEFAULT })
export class ArtistsService {
  constructor(private db: DatabaseService) {}

  public async getArtists(): Promise<IArtist[]> {
    return this.db.artists.getArtistsList();
  }

  public async getArtistById(id: string): Promise<IArtist> {
    const artist: IArtist | null = await this.db.artists.getArtist(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    if (artist) {
      return artist;
    }
  }

  public async create(dto: CreateArtistDto): Promise<IArtist> {
    const newArtist: IArtist = new NewArtist(dto);

    if (!this.checkCreatedArtistDto(dto)) {
      throw new BadRequestException();
    }

    return this.db.artists.createNewArtist(newArtist);
  }

  public async update(
    identifier: string,
    dto: UpdateArtistDto,
  ): Promise<IArtist> {
    const artist: IArtist | null = await this.db.artists.getArtist(identifier);

    if (!uuidValidate(identifier) || !this.isValidUpdateDto(dto)) {
      throw new BadRequestException();
    }

    if (!artist) {
      throw new NotFoundException();
    }

    const incomingArtistValue: IArtist = {
      id: identifier,
      name: dto.name,
      grammy: dto.grammy,
    };

    return this.db.artists.updateArtist(incomingArtistValue);
  }

  public async deleteArtist(id: string): Promise<void> {
    const result: boolean = await this.db.artists.remove(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!result) {
      throw new NotFoundException();
    }

    this.db.resetDependenciesWithArtistId(id); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  private checkCreatedArtistDto(dto: CreateArtistDto): boolean {
    if ('name' in dto && 'grammy' in dto) {
      return true;
    }
    return false;
  }

  private isValidUpdateDto(dto: UpdateArtistDto): boolean {
    if (
      'name' in dto &&
      'grammy' in dto &&
      typeof dto.name === 'string' &&
      typeof dto.grammy === 'boolean'
    ) {
      return true;
    }
    return false;
  }
}
