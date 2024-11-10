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
}
