import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  parkId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Date,
    example: '2024-05-09',
  })
  @IsDateString()
  @IsNotEmpty()
  startedAt: number;

  @ApiProperty({
    type: Date,
    example: '2024-05-10',
  })
  @IsDateString()
  @IsNotEmpty()
  endedAt: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsOptional()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  tariffId: number;
}

// id, park_id, user_id, started_at, ended_at, price, tariff_id, created_at, last_edited_at
