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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(
    private loggingService: LoggingService,
    private artistService: ArtistService,
  ) {}

  @Get()
  async getAllArtist(@Req() req: Request, @Res() res: Response) {
    const artists = await this.artistService.getAllArtist();

    res.status(200).json(artists);
    this.loggingService.commonLogger(req, res.statusCode, artists);
  }

  @Get(':id')
  async getArtistById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const artist = await this.artistService.getArtistById(id);

    res.status(200).json(artist);
    this.loggingService.commonLogger(req, res.statusCode, artist);
  }

  @Post()
  async addArtist(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    const artist = await this.artistService.addArtist(createArtistDto);

    res.status(201).json(artist);
    this.loggingService.commonLogger(req, res.statusCode, artist);
  }

  @Put(':id')
  async updateArtist(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    const artistToUpdate = await this.artistService.getArtistById(id);

    if (!artistToUpdate) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    const updatedArtist = await this.artistService.updateArtist(
      createArtistDto,
      id,
    );
    res.status(200).json(updatedArtist);
    this.loggingService.commonLogger(req, res.statusCode, updatedArtist);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const artistToDelete = await this.artistService.getArtistById(id);

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.artistService.deleteArtist(id);
    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('deleteAll')
  async deleteAllArtists(): Promise<void> {
    await this.artistService.deleteAllArtists();
  }
}
