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
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);

    return album;
  }

  @Post()
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.addAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    const albumToUpdate = await this.albumService.getAlbumById(id);

    if (!albumToUpdate) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return await this.albumService.updateAlbum(createAlbumDto, id);
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

  @Delete('deleteAll')
  async deleteAllAlbums(): Promise<void> {
    await this.albumService.deleteAllAlbums();
  }
}
