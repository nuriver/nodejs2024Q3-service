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
  Req,
  Res,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';
import { Album } from '../album/interfaces/album.interface';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(
    private loggingService: LoggingService,
    private favsService: FavsService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  async getFavs(@Req() req: Request, @Res() res: Response) {
    const favorites = await this.favsService.getFavs();

    res.status(200).json(favorites);
    this.loggingService.commonLogger(req, res.statusCode, favorites);
  }

  @Post('artist/:id')
  async addArtistToFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
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
    const message = `Artist ${artist.name} was added to favorites`;

    res.status(201).json({ message });
    this.loggingService.commonLogger(req, res.statusCode, { message });
  }

  @Post('track/:id')
  async addTrackToFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
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

    const message = `Track ${track.name} was added to favorites`;

    res.status(201).json({ message });
    this.loggingService.commonLogger(req, res.statusCode, { message });
  }

  @Post('album/:id')
  async addAlbumToFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
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

    const message = `Album ${album.name} was added to favorites`;

    res.status(201).json({ message });
    this.loggingService.commonLogger(req, res.statusCode, { message });
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const trackToDelete = await this.trackService.getTrackById(id);

    if (!trackToDelete) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.favsService.deleteTrackFromFavs(id);

    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const albumToDelete = await this.albumService.getAlbumById(id);

    if (!albumToDelete) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.favsService.deleteAlbumFromFavs(id);

    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const artistToDelete = await this.artistService.getArtistById(id);

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.favsService.deleteArtistFromFavs(id);

    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('all')
  async deleteAllFavs() {
    await this.favsService.deleteAllFavs();
  }
}
