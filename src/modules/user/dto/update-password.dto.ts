import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'oldPassword is required' })
  oldPassword: string;

  @IsNotEmpty({ message: 'newPassword is required' })
  @IsString()
  newPassword: string;
}
