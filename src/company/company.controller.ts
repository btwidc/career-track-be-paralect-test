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

import { CompanyService } from './company.service';

import { CompanyDto } from './dto/company.dto';
import { CompanyResponse } from './types/company.type';

import { ObjectIdValidationPipe } from '../global/pipes/object-id-validation.pipe';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/')
  async getCompanies(): Promise<CompanyResponse[]> {
    const companies = await this.companyService.getCompanies();

    if (!companies || !companies.length) {
      throw new NotFoundException([`Companies not found`]);
    }

    return companies;
  }

  @Get('/:companyId')
  @UsePipes(ObjectIdValidationPipe)
  async getCompany(
    @Param('companyId') companyId: string,
  ): Promise<CompanyResponse> {
    const company = await this.companyService.getCompany(companyId);

    if (!company) {
      throw new NotFoundException([`Company not found`]);
    }

    return company;
  }

  @Post('/')
  async createCompany(
    @Body() createCompanyDto: CompanyDto,
  ): Promise<CompanyResponse> {
    return await this.companyService.createCompany(createCompanyDto);
  }

  @Patch('/:companyId')
  @UsePipes(ObjectIdValidationPipe)
  async updateCompany(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: CompanyDto,
  ): Promise<CompanyResponse> {
    const company = await this.companyService.getCompany(companyId);

    if (!company) {
      throw new NotFoundException([`Company with id ${companyId} doesn't exist`]);
    }

    return await this.companyService.updateCompany(companyId, updateCompanyDto);
  }

  @Delete('/:companyId')
  @UsePipes(ObjectIdValidationPipe)
  async deleteCompany(
    @Param('companyId') companyId: string,
  ): Promise<CompanyResponse> {
    const company = await this.companyService.getCompany(companyId);

    if (!company) {
      throw new NotFoundException([`Company with id ${companyId} doesn't exist`]);
    }

    return await this.companyService.deleteCompany(companyId);
  }
}
