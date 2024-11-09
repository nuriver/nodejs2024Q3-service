import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
  }
}
