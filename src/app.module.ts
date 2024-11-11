import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavsModule } from './modules/favs/favs.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
