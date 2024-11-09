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

  @Put(':id')
  async updateTrack(
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
    return { message: 'Track updated successfully', track: updatedTrack };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const trackToDelete = await this.trackService.getTrackById(id);

    if (!trackToDelete) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.trackService.deleteTrack(id);
  }
}
