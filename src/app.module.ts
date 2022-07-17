import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, DatabaseModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
