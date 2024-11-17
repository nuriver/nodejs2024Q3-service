import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Favorites } from './interfaces/favs.interface';
import { PrismaService } from 'src/prisma.service';
import { FavoritesResponse } from './interfaces/favsResponse.interface';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {
    this.initFavs();
  }

  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private async initFavs() {
    const existingFavs = await this.prisma.favs.findFirst();

    if (!existingFavs) {
      await this.prisma.favs.create({
        data: {
          albums: [],
          artists: [],
          tracks: [],
        },
      });
    }
  }

  async getFavs(): Promise<FavoritesResponse> {
    const favs = await this.prisma.favs.findFirst();

    const [artists, albums, tracks] = await Promise.all([
      favs.artists && favs.artists.length > 0
        ? this.prisma.artist.findMany({
            where: { id: { in: favs.artists } },
          })
        : [],
      favs.albums && favs.albums.length > 0
        ? this.prisma.album.findMany({
            where: { id: { in: favs.albums } },
          })
        : [],
      favs.tracks && favs.tracks.length > 0
        ? this.prisma.track.findMany({
            where: { id: { in: favs.tracks } },
          })
        : [],
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrackToFavs(trackId: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        tracks: {
          push: trackId,
        },
      },
    });
  }

  async addArtistToFavs(artistId: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        artists: {
          push: artistId,
        },
      },
    });
  }

  async addAlbumToFavs(albumId: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        albums: {
          push: albumId,
        },
      },
    });
  }

  async deleteTrackFromFavs(id: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    const updatedFavTracks = favs.tracks.filter((trackId) => trackId !== id);

    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        tracks: updatedFavTracks,
      },
    });
  }

  async deleteAlbumFromFavs(id: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    const updatedFavAlbums = favs.albums.filter((albumId) => albumId !== id);

    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        albums: updatedFavAlbums,
      },
    });
  }

  async deleteArtistFromFavs(id: string): Promise<void> {
    const favs = await this.prisma.favs.findFirst();
    const updatedFavArtists = favs.artists.filter(
      (artistId) => artistId !== id,
    );

    await this.prisma.favs.update({
      where: { id: favs.id },
      data: {
        artists: updatedFavArtists,
      },
    });
  }
}
