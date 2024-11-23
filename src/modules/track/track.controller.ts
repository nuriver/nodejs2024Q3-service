import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
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
import { LoggingService } from '../customLogger/customLogger.service';
import { Request, Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(
    private loggingService: LoggingService,
    private trackService: TrackService,
  ) {}

  @Get()
  async getAllTracks(@Req() req: Request, @Res() res: Response) {
    const tracks = await this.trackService.getAllTracks();

    res.status(200).json(tracks);
    this.loggingService.commonLogger(req, res.statusCode, tracks);
  }

  @Get(':id')
  async getTrackById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const track = await this.trackService.getTrackById(id);

    res.status(200).json(track);
    this.loggingService.commonLogger(req, res.statusCode, track);
  }

  @Post()
  async addTrack(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    const track = await this.trackService.addTrack(createTrackDto);

    res.status(201).json(track);
    this.loggingService.commonLogger(req, res.statusCode, track);
  }

  @Put(':id')
  async updateTrack(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    const trackToUpdate = await this.trackService.getTrackById(id);

    if (!trackToUpdate) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    const updatedTrack = await this.trackService.updateTrack(
      createTrackDto,
      id,
    );

    res.status(200).json(updatedTrack);
    this.loggingService.commonLogger(req, res.statusCode, updatedTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const trackToDelete = await this.trackService.getTrackById(id);

    if (!trackToDelete) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.trackService.deleteTrack(id);

    res.status(204).json({});
    this.loggingService.commonLogger(req, res.statusCode, {});
  }

  @Delete('deleteAll')
  async deleteAllTracks(): Promise<void> {
    await this.trackService.deleteAllTracks();
  }
}
