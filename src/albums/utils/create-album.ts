import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from 'src/interfaces/IAlbum';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class NewAlbum implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(dto: CreateAlbumDto) {
    this.id = uuidv4();
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }
}
