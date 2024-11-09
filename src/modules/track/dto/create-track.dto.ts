import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNotEmpty({ message: 'duration is required' })
  @IsInt()
  duration: number;
}
