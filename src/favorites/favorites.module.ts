import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DatabaseModule } from '../database/database.module';
import { FavoritesTrackController } from './favorites-track.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritesController, FavoritesTrackController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
