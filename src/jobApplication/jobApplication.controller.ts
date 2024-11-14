import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';

import { JobApplicationService } from './jobApplication.service';

import { JobApplicationDto } from './dto/job-application.dto';
import { JobApplicationResponse } from './types/job-application.type';

import { ObjectIdValidationPipe } from '../global/pipes/object-id-validation.pipe';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Get('/')
  async getJobApplications(): Promise<JobApplicationResponse[]> {
    const jobApplications = await this.jobApplicationService.getJobApplications();

    if (!jobApplications || !jobApplications.length) {
      throw new NotFoundException([`Job applications not found`]);
    }

    return jobApplications;
  }

  @Get('/:jobApplicationId')
  @UsePipes(ObjectIdValidationPipe)
  async getJobApplication(
    @Param('jobApplicationId') jobApplicationId: string,
  ): Promise<JobApplicationResponse> {
    const jobApplication = await this.jobApplicationService.getJobApplication(jobApplicationId);

    if (!jobApplication) {
      throw new NotFoundException([`Job application not found`]);
    }

    return jobApplication;
  }

  @Post('/')
  async createJobApplication(
    @Body() createJobApplicationDto: JobApplicationDto,
  ): Promise<JobApplicationResponse> {
    return await this.jobApplicationService.createJobApplication(createJobApplicationDto);
  }

  @Patch('/:jobApplicationId')
  @UsePipes(ObjectIdValidationPipe)
  async updateJobApplication(
    @Param('jobApplicationId') jobApplicationId: string,
    @Body() updateJobApplicationDto: JobApplicationDto,
  ): Promise<JobApplicationResponse> {
    const jobApplication = await this.jobApplicationService.getJobApplication(jobApplicationId);

    if (!jobApplication) {
      throw new NotFoundException([`Job application with id ${jobApplicationId} doesn't exist`]);
    }

    return await this.jobApplicationService.updateJobApplication(jobApplicationId, updateJobApplicationDto);
  }

  @Delete('/:jobApplicationId')
  @UsePipes(ObjectIdValidationPipe)
  async deleteJobApplication(
    @Param('jobApplicationId') jobApplicationId: string,
  ): Promise<JobApplicationResponse> {
    const jobApplication = await this.jobApplicationService.getJobApplication(jobApplicationId);

    if (!jobApplication) {
      throw new NotFoundException([`Job application with id ${jobApplicationId} doesn't exist`]);
    }

    return await this.jobApplicationService.deleteJobApplication(jobApplicationId);
  }
}
