import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersDBService } from './services/usersDB.service';
import { ArtistsDBService } from './services/artistsDB.service';
import { TracksDBService } from './services/tracksDB.service';

@Module({
  providers: [
    DatabaseService,
    UsersDBService,
    ArtistsDBService,
    TracksDBService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
