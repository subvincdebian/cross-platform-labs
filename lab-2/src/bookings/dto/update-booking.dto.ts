import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  readonly playerName?: string;

  @IsOptional()
  @IsString()
  readonly zone?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly pcNumber?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly durationHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
