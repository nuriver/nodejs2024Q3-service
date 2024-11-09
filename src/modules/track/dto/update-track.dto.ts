import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsNotEmpty({ message: 'duration is required' })
  @IsInt()
  duration: number;
}
