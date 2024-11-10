import { Exclude } from 'class-transformer';

export class ArtistEntity {
  name: string;
  grammy: boolean;

  @Exclude()
  id: string;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
