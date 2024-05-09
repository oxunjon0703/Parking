import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTariffDto {
  @ApiProperty({
    type: String,
    example: 'start30',
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
  parkId: number;

  @ApiProperty({
    type: Number,
    example: 50000,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    example: 12,
  })
  @IsInt()
  @IsNotEmpty()
  time: number;
}

// id, name, park_id, price, time, created_at, last_edited_at
