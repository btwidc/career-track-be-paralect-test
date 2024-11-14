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

import { VacancyService } from './vacancy.service';

import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyResponse } from './types/vacancy.type';

import { ObjectIdValidationPipe } from '../global/pipes/object-id-validation.pipe';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('/')
  async getVacancies(): Promise<VacancyResponse[]> {
    const vacancies = await this.vacancyService.getVacancies();

    if (!vacancies || !vacancies.length) {
      throw new NotFoundException([`Vacancies not found`]);
    }

    return vacancies;
  }

  @Get('/:vacancyId')
  @UsePipes(ObjectIdValidationPipe)
  async getVacancy(
    @Param('vacancyId') vacancyId: string,
  ): Promise<VacancyResponse> {
    const vacancy = await this.vacancyService.getVacancy(vacancyId);

    if (!vacancy) {
      throw new NotFoundException([`Vacancy not found`]);
    }

    return vacancy;
  }

  @Post('/')
  async createVacancy(
    @Body() createVacancyDto: CreateVacancyDto,
  ): Promise<VacancyResponse> {
    return await this.vacancyService.createVacancy(createVacancyDto);
  }

  @Patch('/:vacancyId')
  @UsePipes(ObjectIdValidationPipe)
  async updateVacancy(
    @Param('vacancyId') vacancyId: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<VacancyResponse> {
    const vacancy = await this.vacancyService.getVacancy(vacancyId);

    if (!vacancy) {
      throw new NotFoundException([`Vacancy with id ${vacancyId} doesn't exist`]);
    }

    return await this.vacancyService.updateVacancy(vacancyId, updateVacancyDto);
  }

  @Delete('/:vacancyId')
  @UsePipes(ObjectIdValidationPipe)
  async deleteVacancy(
    @Param('vacancyId') vacancyId: string,
  ): Promise<VacancyResponse> {
    const vacancy = await this.vacancyService.getVacancy(vacancyId);

    if (!vacancy) {
      throw new NotFoundException([`Vacancy with id ${vacancyId} doesn't exist`]);
    }

    return await this.vacancyService.deleteVacancy(vacancyId);
  }
}
