import { forwardRef, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { PrismaModule } from 'src/prisma.module';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  exports: [FavsService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => PrismaModule),
  ],
})
export class FavsModule {}
