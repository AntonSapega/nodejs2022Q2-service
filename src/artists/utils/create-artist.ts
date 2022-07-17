import { v4 as uuidv4 } from 'uuid';
import { IArtist } from 'src/interfaces/IArtist';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class NewArtist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(info: CreateArtistDto) {
    this.id = uuidv4();
    this.name = info.name;
    this.grammy = info.grammy;
  }
}
