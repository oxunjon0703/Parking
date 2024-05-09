import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { RoleEnum } from '../../../common/enums/enum';

const Role = [RoleEnum.Client, RoleEnum.Owner];

export class CreateUserDto {
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
    example: 'Oxunjon07',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: RoleEnum,
    example: RoleEnum.Client,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: RoleEnum;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  parkId: number;
}

// id, phone, password, role, created_at, last_edited_at, park_id
