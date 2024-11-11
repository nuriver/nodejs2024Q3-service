import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

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

  async artistExist(id?: string) {
    if (!id) {
      return false;
    }

    const artist = await this.getArtistById(id);

    if (!artist) {
      return false;
    }

    return true;
  }

  async updateArtist(
    createArtistDto: CreateArtistDto,
    id: string,
  ): Promise<Artist> {
    const artistToUpdate = await this.getArtistById(id);
    Object.assign(artistToUpdate, createArtistDto);
    return artistToUpdate;
  }

  async deleteArtist(id: string): Promise<void> {
    this.artists = this.artists.filter((artist) => artist.id !== id);
    const trackWithTheArtist = await this.trackService.getTrackByArtistId(id);
    const albumWithTheArtist = await this.albumService.getAlbumByArtistId(id);

    if (trackWithTheArtist) {
      trackWithTheArtist.artistId = null;
    }

    if (albumWithTheArtist) {
      albumWithTheArtist.artistId = null;
    }

    this.favsService.deleteArtistFromFavs(id);
  }
}
