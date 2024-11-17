import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { FavsService } from '../favs/favs.service';
import { PrismaService } from '../../prisma.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  private tracks: Track[] = [];

  async getAllTracks(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return track;
  }

  async getTrackByArtistId(id: string): Promise<Track | undefined> {
    return this.prisma.track.findFirst({
      where: {
        artistId: id,
      },
    });
  }

  async getTrackByAlbumId(id: string): Promise<Track | undefined> {
    return this.prisma.track.findFirst({
      where: {
        albumId: id,
      },
    });
  }

  async addTrack(trackDto: CreateTrackDto): Promise<Track> {
    const artistId = trackDto.artistId;
    const albumId = trackDto.albumId;

    if (artistId) {
      await this.artistService.getArtistById(artistId);
    }

    if (albumId) {
      await this.albumService.getAlbumById(albumId);
    }

    return await this.prisma.track.create({
      data: trackDto,
    });
  }

  async updateTrack(
    updateTrackDto: CreateTrackDto,
    id: string,
  ): Promise<Track> {
    const artistId = updateTrackDto.artistId;
    const albumId = updateTrackDto.albumId;

    if (artistId) {
      await this.artistService.getArtistById(artistId);
    }

    if (albumId) {
      await this.albumService.getAlbumById(albumId);
    }

    return await this.prisma.track.update({
      where: {
        id: id,
      },
      data: {
        ...updateTrackDto,
      },
    });
  }

  async deleteTrack(id: string): Promise<void> {
    await this.prisma.track.delete({
      where: {
        id,
      },
    });

    this.favsService.deleteTrackFromFavs(id);
  }

  async deleteAllTracks(): Promise<void> {
    await this.prisma.track.deleteMany({});
  }
}
