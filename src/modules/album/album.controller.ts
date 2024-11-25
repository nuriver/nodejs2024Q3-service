import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(
    private loggingService: LoggingService,
    private albumService: AlbumService,
  ) {}

  @Get()
  async getAllAlbums(@Req() req: Request, @Res() res: Response) {
    const albums = await this.albumService.getAllAlbums();

    res.status(200).json(albums);
    this.loggingService.commonLogger(req, res.statusCode, albums);
  }

  @Get(':id')
  async getAlbumById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const album = await this.albumService.getAlbumById(id);

    res.status(200).json(album);
    this.loggingService.commonLogger(req, res.statusCode, album);
  }

  @Post()
  async addAlbum(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    const album = await this.albumService.addAlbum(createAlbumDto);

    res.status(201).json(album);
    this.loggingService.commonLogger(req, res.statusCode, album);
  }

  @Put(':id')
  async updateAlbum(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    const albumToUpdate = await this.albumService.getAlbumById(id);

    if (!albumToUpdate) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    const updatedAlbum = await this.albumService.updateAlbum(
      createAlbumDto,
      id,
    );

    res.status(200).json(updatedAlbum);
    this.loggingService.commonLogger(req, res.statusCode, updatedAlbum);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const albumToDelete = await this.albumService.getAlbumById(id);

    if (!albumToDelete) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.albumService.deleteAlbum(id);
    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('deleteAll')
  async deleteAllAlbums(): Promise<void> {
    await this.albumService.deleteAllAlbums();
  }
}
