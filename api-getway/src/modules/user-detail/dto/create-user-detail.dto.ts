import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDetailDto {
  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    type: String,
    example: 'Xatamov',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsOptional()
  avatar: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
// id, firstname, lastname, avatar, user_id, created_at, last_edited_at
