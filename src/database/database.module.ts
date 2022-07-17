import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersDBService } from './services/usersDB.service';
import { ArtistsDBService } from './services/artistsDB.service';
import { TracksDBService } from './services/tracksDB.service';
import { AlbumsDBService } from './services/albumsDB.service';
import { FavoritesDBService } from './services/favoritesDB.service';

@Module({
  providers: [
    DatabaseService,
    UsersDBService,
    ArtistsDBService,
    TracksDBService,
    AlbumsDBService,
    FavoritesDBService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
