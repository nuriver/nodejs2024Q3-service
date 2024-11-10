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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAllArtist() {
    return await this.artistService.getAllArtist();
  }

  @Get(':id')
  async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }

  @Post()
  async addArtist(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.addArtist(createArtistDto);
    return artist;
  }

  @Put(':id')
  async updateArtist(
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
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artistToDelete = await this.artistService.getArtistById(id);

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.artistService.deleteArtist(id);
  }
}
