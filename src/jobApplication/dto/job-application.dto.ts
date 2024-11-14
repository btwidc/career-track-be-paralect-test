import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JobApplicationEnum } from '../enums/job-application-status.enum';

export class JobApplicationDto {
  @IsEnum(JobApplicationEnum)
  @IsOptional()
  status: JobApplicationEnum = JobApplicationEnum.REVIEW;

  @IsString()
  @IsOptional()         
  note: string;

  @IsString()
  @IsNotEmpty()
  vacancyId: string;

  @IsString()
  @IsNotEmpty()
  candidateId: string;       
}
