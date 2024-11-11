import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistEntity } from './entities/artist.entity';
import { FavsModule } from '../favs/favs.module';

@Module({
  providers: [ArtistService, ArtistEntity],
  controllers: [ArtistController],
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [ArtistService, ArtistEntity],
})
export class ArtistModule {}
