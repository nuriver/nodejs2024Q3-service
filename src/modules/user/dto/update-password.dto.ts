import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
