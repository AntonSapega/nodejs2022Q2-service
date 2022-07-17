import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, DatabaseModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
