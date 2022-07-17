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
import { TracksService } from './tracks.service';
import { ITrack } from 'src/interfaces/ITrack';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<ITrack[]> {
    return this.tracksService.getTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrack(@Param('id') id: string): Promise<ITrack> {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.tracksService.deleteTrack(id);
  }
}
