import { Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackEntity } from '../track/entities/track-entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';

@Injectable()
export class FavsService {
  constructor(
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getFavs() {
    let favTracks = await Promise.all(
      this.favs.tracks.map((trackId) =>
        this.trackService.getTrackById(trackId),
      ),
    );
    favTracks = favTracks.filter((track) => track !== undefined);

    let favAlbums = await Promise.all(
      this.favs.albums.map((albumId) =>
        this.albumService.getAlbumById(albumId),
      ),
    );
    favAlbums = favAlbums.filter((album) => album !== undefined);

    let favArtists = await Promise.all(
      this.favs.artists.map((artistId) =>
        this.artistService.getArtistById(artistId),
      ),
    );
    favArtists = favArtists.filter((artist) => artist !== undefined);

    return {
      tracks: favTracks,
      albums: favAlbums,
      artists: favArtists,
    };
  }

  async addTrackToFavs(trackId: string): Promise<void> {
    this.favs.tracks.push(trackId);
  }

  async addArtistToFavs(artistId: string): Promise<void> {
    this.favs.artists.push(artistId);
  }

  async addAlbumToFavs(albumId: string): Promise<void> {
    this.favs.albums.push(albumId);
  }
}