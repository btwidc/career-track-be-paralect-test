import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { JobApplicationDto } from './dto/job-application.dto';
import { IncludeCandidateAndVacancyFields } from './interfaces/include-candidate-and-vacancy-fields.interface';
import { JobApplicationResponse } from './types/job-application.type';

@Injectable()
export class JobApplicationService {
  private readonly includeCandidateAndVacancyFields: IncludeCandidateAndVacancyFields;
  constructor(private readonly prisma: PrismaService) {
    this.includeCandidateAndVacancyFields = {
      vacancy: {
        select: {
          id: true,
          title: true,
          salaryFork: true,
          companyId: true,
          company: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      candidate: true,
    };
  }

  async getJobApplications(): Promise<JobApplicationResponse[]> {
    return await this.prisma.jobApplication.findMany({
      include: {
        ...this.includeCandidateAndVacancyFields,
      },
    });
  }

  async getJobApplication(id: string): Promise<JobApplicationResponse> {
    return await this.prisma.jobApplication.findUnique({
      where: {
        id,
      },
      include: {
        ...this.includeCandidateAndVacancyFields,
      },
    });
  }

  async createJobApplication(
    createJobApplicationDto: JobApplicationDto,
  ): Promise<JobApplicationResponse> {
    return await this.prisma.jobApplication.create({
      data: {
        ...createJobApplicationDto,
      },
      include: {
        ...this.includeCandidateAndVacancyFields,
      },
    });
  }

  async updateJobApplication(
    id: string,
    updateJobApplicationDto: JobApplicationDto,
  ): Promise<JobApplicationResponse> {
    return await this.prisma.jobApplication.update({
      where: {
        id,
      },
      data: {
        ...updateJobApplicationDto,
      },
      include: {
        ...this.includeCandidateAndVacancyFields,
      },
    });
  }

  async deleteJobApplication(id: string): Promise<JobApplicationResponse> {
    return await this.prisma.jobApplication.delete({
      where: {
        id,
      },
    });
  }
}
