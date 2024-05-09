import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserTariffDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  tariffId: number;

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
}

// id, user_id, tariff_id, started_at, ended_at, created_at, last_edited_at
