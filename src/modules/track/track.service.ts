import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
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
}
