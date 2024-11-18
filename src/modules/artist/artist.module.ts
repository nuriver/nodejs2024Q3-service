import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavsModule } from '../favs/favs.module';
import { PrismaModule } from 'src/prisma.module';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [forwardRef(() => FavsModule), forwardRef(() => PrismaModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
