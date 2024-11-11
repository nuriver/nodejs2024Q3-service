import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Favorites } from './interfaces/favs.interface';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
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

  async deleteTrackFromFavs(id: string): Promise<void> {
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
  }

  async deleteAlbumFromFavs(id: string): Promise<void> {
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
  }

  async deleteArtistFromFavs(id: string): Promise<void> {
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
  }
}
