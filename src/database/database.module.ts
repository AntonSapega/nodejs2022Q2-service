import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersDBService } from './usersDB.service';
import { ArtistsDBService } from './artistsDB.service';

@Module({
  providers: [DatabaseService, UsersDBService, ArtistsDBService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
