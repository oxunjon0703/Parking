import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({
    type: String,
    example: 'name',
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
  layerId: number;

  @ApiProperty({
    type: Number,
    example: 10000,
  })
  @IsInt()
  @IsOptional()
  price: number;
}

// id, name, layer_id, price, created_at, last_edited_at
