import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.inteface';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(id: string): Promise<Album | undefined> {
    return this.albums.find((album) => album.id === id);
  }
}
