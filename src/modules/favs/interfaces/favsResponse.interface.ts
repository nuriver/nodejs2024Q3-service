import { Album } from 'src/modules/album/interfaces/album.interface';
import { Track } from 'src/modules/track/interfaces/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
