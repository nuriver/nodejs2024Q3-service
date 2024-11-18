import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistModule } from '../artist/artist.module';
import { FavsModule } from '../favs/favs.module';
import { PrismaModule } from 'src/prisma.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => FavsModule),
    forwardRef(() => PrismaModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
