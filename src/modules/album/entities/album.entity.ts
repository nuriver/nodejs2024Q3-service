import { Exclude } from 'class-transformer';

export class AlbumEntity {
  name: string;
  year: number;
  artistId: string | null;

  @Exclude()
  id: string;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
