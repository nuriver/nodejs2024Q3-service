import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  private albums: Album[] = [];

  async getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album | undefined> {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  async getAlbumByArtistId(id: string): Promise<Album | undefined> {
    return this.prisma.album.findFirst({
      where: {
        artistId: id,
      },
    });
  }

  async addAlbum(albumDto: CreateAlbumDto): Promise<Album> {
    const artistId = albumDto.artistId;

    if (artistId) {
      const artist = this.prisma.artist.findUnique({
        where: {
          id: artistId,
        },
      });

      if (!artist) {
        throw new NotFoundException(`Artist with ID ${artistId} not found`);
      }
    }

    return await this.prisma.album.create({
      data: albumDto,
    });
  }

  async albumExist(id?: string) {
    if (!id) {
      return false;
    }

    const album = await this.getAlbumById(id);

    if (!album) {
      return false;
    }

    return true;
  }

  async updateAlbum(albumDto: CreateAlbumDto, id: string): Promise<Album> {
    const artistId = albumDto.artistId;

    if (artistId) {
      const artist = this.prisma.artist.findUnique({
        where: {
          id: artistId,
        },
      });

      if (!artist) {
        throw new NotFoundException(`Artist with ID ${artistId} not found`);
      }
    }

    return await this.prisma.album.update({
      where: {
        id: id,
      },
      data: {
        ...albumDto,
      },
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.prisma.album.delete({
      where: {
        id,
      },
    });

    const trackWithTheAlbum = await this.trackService.getTrackByAlbumId(id);

    if (trackWithTheAlbum) {
      trackWithTheAlbum.albumId = null;
    }

    this.favsService.deleteAlbumFromFavs(id);
  }

  async deleteAllAlbums(): Promise<void> {
    await this.prisma.album.deleteMany({});
  }
}
