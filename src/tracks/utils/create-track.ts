import { v4 as uuidv4 } from 'uuid';
import { ITrack } from 'src/interfaces/ITrack';
import { CreateTrackDto } from '../dto/create-track.dto';

export class NewTrack implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: CreateTrackDto) {
    this.id = uuidv4();
    this.name = track.name;
    this.artistId = track.artistId;
    this.albumId = track.albumId;
    this.duration = track.duration;
  }
}
