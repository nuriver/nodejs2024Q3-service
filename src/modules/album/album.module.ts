import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => TrackModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
