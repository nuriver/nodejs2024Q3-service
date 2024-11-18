import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FavsService } from '../favs/favs.service';
import { PrismaService } from '../../prisma.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

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
      await this.artistService.getArtistById(artistId);
    }

    return await this.prisma.album.create({
      data: albumDto,
    });
  }

  async updateAlbum(albumDto: CreateAlbumDto, id: string): Promise<Album> {
    const artistId = albumDto.artistId;

    if (artistId) {
      await this.artistService.getArtistById(artistId);
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

    this.favsService.deleteAlbumFromFavs(id);
  }

  async deleteAllAlbums(): Promise<void> {
    await this.prisma.album.deleteMany({});
  }
}
