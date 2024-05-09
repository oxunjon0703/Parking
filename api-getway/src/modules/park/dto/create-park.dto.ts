import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParkDto {
  @ApiProperty({
    type: String,
    example: 'parking',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  owner: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsOptional()
  image: number;
}

// id, name, owner, image, created_at, last_edited_at;
