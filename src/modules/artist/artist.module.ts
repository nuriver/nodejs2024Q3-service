import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [forwardRef(() => TrackModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
