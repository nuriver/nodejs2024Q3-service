import { Album } from 'src/modules/album/interfaces/album.interface';
import { Artist } from 'src/modules/artist/interfaces/artist.interface';
import { Track } from 'src/modules/track/interfaces/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
