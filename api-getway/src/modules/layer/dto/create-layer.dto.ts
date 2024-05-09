import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLayerDto {
  @ApiProperty({
    type: String,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  floor: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  parkId: number;
}

// id, name, floor, park_id, created_at, last_edited_at
