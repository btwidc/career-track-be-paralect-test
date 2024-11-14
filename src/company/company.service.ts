import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CompanyDto } from './dto/company.dto';
import { IncludeVacancyFields } from './interfaces/include-vacancy-fields.interface';
import { CompanyResponse } from './types/company.type';

@Injectable()
export class CompanyService {
  private readonly includeVacancyFields: IncludeVacancyFields;
  constructor(private readonly prisma: PrismaService) {
    this.includeVacancyFields = {
      vacancies: {
        select: {
          id: true,
          title: true,
          salaryFork: true,
        },
      },
    };
  }

  async getCompanies(): Promise<CompanyResponse[]> {
    return await this.prisma.company.findMany({
      include: {
        ...this.includeVacancyFields,
      }
    });
  }

  async getCompany(id: string): Promise<CompanyResponse> {
    return await this.prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        ...this.includeVacancyFields,
      }
    });
  }

  async createCompany(
    createCompanyDto: CompanyDto,
  ): Promise<CompanyResponse> {
    return await this.prisma.company.create({
      data: {
        ...createCompanyDto,
      },
    });
  }

  async updateCompany(
    id: string,
    updateCompanyDto: CompanyDto,
  ): Promise<CompanyResponse> {
    return await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        ...updateCompanyDto,
      },
    });
  }

  async deleteCompany(id: string): Promise<CompanyResponse> {
    return await this.prisma.company.delete({
      where: {
        id,
      },
    });
  }
}
