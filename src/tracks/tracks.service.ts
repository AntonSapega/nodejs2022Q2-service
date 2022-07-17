import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { ITrack } from 'src/interfaces/ITrack';
import { CreateTrackDto } from './dto/create-track.dto';
import { NewTrack } from './utils/create-track';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DatabaseService) {}

  public async getTracks(): Promise<ITrack[]> {
    return this.db.tracks.getTracksList();
  }

  public async getTrackById(id: string): Promise<ITrack> {
    const track: ITrack | null = await this.db.tracks.getTrack(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    if (track) {
      return track;
    }
  }

  public async create(dto: CreateTrackDto): Promise<ITrack> {
    const newTrack: ITrack = new NewTrack(dto);

    if (!this.isDto<CreateTrackDto>(dto)) {
      throw new BadRequestException();
    }

    return this.db.tracks.createNewTrack(newTrack);
  }

  public async update(
    identifier: string,
    dto: UpdateTrackDto,
  ): Promise<ITrack> {
    const track: ITrack | null = await this.db.tracks.getTrack(identifier);

    if (!uuidValidate(identifier) || !this.isValidTypesDto(dto)) {
      throw new BadRequestException();
    }

    if (!track) {
      throw new NotFoundException();
    }

    const incomingTrackValue: ITrack = {
      id: identifier,
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };

    return this.db.tracks.updateTrack(incomingTrackValue);
  }

  public async deleteTrack(id: string): Promise<void> {
    const result: boolean = await this.db.tracks.remove(id);

    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    if (!result) {
      throw new NotFoundException();
    }
  }

  // PRIVATE
  private isDto<T>(dto: T): boolean {
    if (
      'name' in dto &&
      'artistId' in dto &&
      'albumId' in dto &&
      'duration' in dto
    ) {
      return true;
    }
    return false;
  }

  private isValidTypesDto(dto: UpdateTrackDto): boolean {
    if (
      typeof dto.name === 'string' &&
      typeof dto.duration === 'number' &&
      (typeof dto.artistId === 'string' || dto.artistId === null) &&
      (typeof dto.albumId === 'string' || dto.albumId === null)
    ) {
      return true;
    }
    return false;
  }
}
