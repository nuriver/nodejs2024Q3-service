import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavsService } from './modules/favs/favs.service';
import { FavsController } from './modules/favs/favs.controller';
import { FavsModule } from './modules/favs/favs.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule],
  controllers: [AppController, FavsController],
  providers: [AppService, FavsService],
})
export class AppModule {}
