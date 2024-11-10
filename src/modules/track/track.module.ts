import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
})
export class TrackModule {}
