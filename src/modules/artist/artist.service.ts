import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  async getAllArtist(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }

  async addArtist(artistDto: CreateArtistDto): Promise<Artist> {
    const id = uuidv4();
    const artist = {
      id,
      ...artistDto,
    };
    this.artists.push(artist);

    return artist;
  }

  async updateArtist(
    createArtistDto: CreateArtistDto,
    id: string,
  ): Promise<Artist> {
    const artistToUpdate = await this.getArtistById(id);
    Object.assign(artistToUpdate, createArtistDto);
    return artistToUpdate;
  }
}
