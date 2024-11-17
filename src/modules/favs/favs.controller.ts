import {
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
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { PrismaService } from 'src/prisma.service';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';
import { Album } from '../album/interfaces/album.interface';

@Controller('favs')
export class FavsController {
  constructor(
    private favsService: FavsService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async getFavs() {
    const favorites = await this.favsService.getFavs();

    return favorites;
  }

  @Post('artist/:id')
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    let artist: Artist;
    try {
      artist = await this.artistService.getArtistById(id);
    } catch {
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
    let track: Track;
    try {
      track = await this.trackService.getTrackById(id);
    } catch {
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
    let album: Album;
    try {
      album = await this.albumService.getAlbumById(id);
    } catch {
      throw new HttpException(
        `Album with ID ${id} not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favsService.addAlbumToFavs(id);

    return { message: `Album ${album.name} was added to favorites` };
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const trackToDelete = await this.trackService.getTrackById(id);

    if (!trackToDelete) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.favsService.deleteTrackFromFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const albumToDelete = await this.albumService.getAlbumById(id);

    if (!albumToDelete) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.favsService.deleteAlbumFromFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const artistToDelete = await this.artistService.getArtistById(id);

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.favsService.deleteArtistFromFavs(id);
  }
}
