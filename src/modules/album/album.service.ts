import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-track.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === id);
  }

  async addAlbum(albumDto: CreateAlbumDto): Promise<Album> {
    const id = uuidv4();
    const album = {
      id,
      ...albumDto,
    };

    this.albums.push(album);
    return album;
  }
}
