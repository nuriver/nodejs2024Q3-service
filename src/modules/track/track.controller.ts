import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return track;
  }

  @Post()
  async addTrack(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.trackService.addTrack(createTrackDto);
    return { message: 'Track added successfully', track: track };
  }
}
