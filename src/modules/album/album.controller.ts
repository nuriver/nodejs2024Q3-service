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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-track.dto';
import { ArtistService } from '../artist/artist.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  @Post()
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const artistId = createAlbumDto.artistId;

    if (artistId && !(await this.artistService.artistExist(artistId))) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    const album = await this.albumService.addAlbum(createAlbumDto);
    return album;
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    const artistId = createAlbumDto.artistId;

    if (artistId && !(await this.artistService.artistExist(artistId))) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    const albumToUpdate = await this.albumService.getAlbumById(id);

    if (!albumToUpdate) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    const updatedTrack = await this.albumService.updateAlbum(
      createAlbumDto,
      id,
    );
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const albumToDelete = await this.albumService.getAlbumById(id);

    if (!albumToDelete) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.albumService.deleteAlbum(id);
  }
}
