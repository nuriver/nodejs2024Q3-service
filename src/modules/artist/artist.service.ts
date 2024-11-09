import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  async getAllArtist(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id === id);
  }
}
