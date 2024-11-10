import { Injectable } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-track.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(private trackService: TrackService) {}

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

  async updateAlbum(albumDto: CreateAlbumDto, id: string): Promise<Album> {
    const albumToUpdate = await this.getAlbumById(id);
    Object.assign(albumToUpdate, albumDto);
    return albumToUpdate;
  }

  async deleteAlbum(id: string): Promise<void> {
    this.albums = this.albums.filter((album) => album.id !== id);
    const trackWithTheAlbum = await this.trackService.getTrackByAlbumId(id);

    if (trackWithTheAlbum) {
      trackWithTheAlbum.albumId = null;
    }
  }
}
