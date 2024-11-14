import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  salaryFork: string;

  @IsString()
  @IsOptional()
  companyId?: string;
}
