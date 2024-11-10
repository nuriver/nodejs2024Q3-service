import { Exclude } from 'class-transformer';

export class TrackEntity {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  @Exclude()
  id: string;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
