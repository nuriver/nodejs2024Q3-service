import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistModule } from '../artist/artist.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [forwardRef(() => ArtistModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
