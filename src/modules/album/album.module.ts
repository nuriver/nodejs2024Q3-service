import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumEntity } from './entities/album.entity';
import { FavsModule } from '../favs/favs.module';

@Module({
  providers: [AlbumService, AlbumEntity],
  controllers: [AlbumController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  exports: [AlbumService, AlbumEntity],
})
export class AlbumModule {}
