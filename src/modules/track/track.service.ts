import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
  ) {}
  private tracks: Track[] = [];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
  }

  async getTrackByArtistId(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.artistId === id);
  }

  async getTrackByAlbumId(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.albumId === id);
  }

  async addTrack(trackDto: CreateTrackDto): Promise<Track> {
    const id = uuidv4();
    const track = {
      id,
      ...trackDto,
    };

    this.tracks.push(track);
    return track;
  }

  async updateTrack(
    updateTrackDto: CreateTrackDto,
    id: string,
  ): Promise<Track> {
    const originalTrackToUpdate = await this.getTrackById(id);
    Object.assign(originalTrackToUpdate, updateTrackDto);
    return originalTrackToUpdate;
  }

  async deleteTrack(id: string): Promise<void> {
    this.tracks = this.tracks.filter((track) => track.id !== id);

    this.favsService.deleteTrackFromFavs(id);
  }
}
