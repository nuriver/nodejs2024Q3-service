import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackEntity } from './entities/track-entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackEntity],
  exports: [TrackService, TrackEntity],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
})
export class TrackModule {}
