import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: '+998991853703',
  })
  @IsString()
  @Length(13, 13)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
