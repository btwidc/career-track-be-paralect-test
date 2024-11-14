import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyResponse } from './types/vacancy.type';
import { IncludeCompanyFields } from './interfaces/include-company-fields.interface';

@Injectable()
export class VacancyService {
  private readonly includeCompanyFields: IncludeCompanyFields;
  constructor(private readonly prisma: PrismaService) {
    this.includeCompanyFields = {
      company: {
        select: {
          id: true,
          title: true,
        },
      },
    };
  }

  async getVacancies(): Promise<VacancyResponse[]> {
    return await this.prisma.vacancy.findMany({
        include: {
          ...this.includeCompanyFields,
        },
    });
  }

  async getVacancy(id: string): Promise<VacancyResponse> {
    return await this.prisma.vacancy.findUnique({
      where: {
        id,
      },
      include: {
        ...this.includeCompanyFields,
      },
    });
  }

  async createVacancy(
    createVacancyDto: CreateVacancyDto,
  ): Promise<VacancyResponse> {
    return await this.prisma.vacancy.create({
      data: {
        ...createVacancyDto,
      },
    });
  }

  async updateVacancy(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<VacancyResponse> {
    return await this.prisma.vacancy.update({
      where: {
        id,
      },
      data: {
        ...updateVacancyDto,
      },
      include: {
        ...this.includeCompanyFields,
      },
    });
  }

  async deleteVacancy(id: string): Promise<VacancyResponse> {
    return await this.prisma.vacancy.delete({
      where: {
        id,
      },
    });
  }
}
