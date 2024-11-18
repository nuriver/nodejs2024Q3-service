import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FavsService } from '../favs/favs.service';
import { Artist } from './interfaces/artist.interface';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService)) private favsService: FavsService,
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async getAllArtist(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }

  async addArtist(artistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: artistDto,
    });
  }

  async updateArtist(
    createArtistDto: CreateArtistDto,
    id: string,
  ): Promise<Artist> {
    return await this.prisma.artist.update({
      where: {
        id: id,
      },
      data: {
        ...createArtistDto,
      },
    });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.prisma.artist.delete({
      where: {
        id,
      },
    });

    this.favsService.deleteArtistFromFavs(id);
  }

  async deleteAllArtists(): Promise<void> {
    await this.prisma.artist.deleteMany({});
  }
}
