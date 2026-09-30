import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString({ message: 'Нікнейм гравця повинен бути рядком' })
  @IsNotEmpty({ message: 'Нікнейм гравця є обов’язковим' })
  readonly playerName!: string;

  @IsString({ message: 'Зона повинна бути рядком' })
  @IsNotEmpty({ message: 'Оберіть ігрову зону' })
  readonly zone!: string;

  @IsNumber({}, { message: 'Номер ПК повинен бути числом' })
  @Min(1, { message: 'Номер ПК повинен бути більшим за 0' })
  readonly pcNumber!: number;

  @IsNumber({}, { message: 'Тривалість повинна бути числом' })
  @Min(1, { message: 'Мінімальний час бронювання - 1 година' })
  readonly durationHours!: number;

  @IsNumber({}, { message: 'Вартість повинна бути числом' })
  @Min(0, { message: 'Вартість не може бути від’ємною' })
  readonly price!: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
