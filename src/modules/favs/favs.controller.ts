import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Controller('favs')
export class FavsController {
  constructor(
    private favsService: FavsService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  async getFavs() {
    const favorites = await this.favsService.getFavs();

    return favorites;
  }

  @Post('artist/:id')
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);

    if (!artist) {
      throw new HttpException(
        `Artist with ID ${id} not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favsService.addArtistToFavs(id);

    return { message: `Artist ${artist.name} was added to favorites` };
  }

  @Post('track/:id')
  async addTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrackById(id);

    if (!track) {
      throw new HttpException(
        `Track with ID ${id} not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favsService.addTrackToFavs(id);

    return { message: `Track ${track.name} was added to favorites` };
  }

  @Post('album/:id')
  async addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);

    if (!album) {
      throw new HttpException(
        `Album with ID ${id} not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favsService.addAlbumToFavs(id);

    return { message: `Album ${album.name} was added to favorites` };
  }
}
