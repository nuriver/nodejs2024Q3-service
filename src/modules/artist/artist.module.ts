import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  providers: [ArtistService, ArtistEntity],
  controllers: [ArtistController],
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule)],
  exports: [ArtistService, ArtistEntity],
})
export class ArtistModule {}
