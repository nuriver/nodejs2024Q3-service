import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { FavsModule } from './modules/favs/favs.module';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshModule } from './modules/refresh/refresh.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    RefreshModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
