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

import { CandidateService } from './candidate.service';

import { CandidateDto } from './dto/candidate.dto';
import { CandidateResponse } from './types/candidate.type';

import { ObjectIdValidationPipe } from '../global/pipes/object-id-validation.pipe';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('/')
  async getCandidates(): Promise<CandidateResponse[]> {
    const candidates = await this.candidateService.getCandidates();

    if (!candidates || !candidates.length) {
      throw new NotFoundException([`Candidates not found`]);
    }

    return candidates;
  }

  @Get('/:candidateId')
  @UsePipes(ObjectIdValidationPipe)
  async getCandidate(
    @Param('candidateId') candidateId: string,
  ): Promise<CandidateResponse> {
    const candidate = await this.candidateService.getCandidate(candidateId);

    if (!candidate) {
      throw new NotFoundException([`Candidate not found`]);
    }

    return candidate;
  }

  @Post('/')
  async createCandidate(
    @Body() createCandidateDto: CandidateDto,
  ): Promise<CandidateResponse> {
    return await this.candidateService.createCandidate(createCandidateDto);
  }

  @Patch('/:candidateId')
  @UsePipes(ObjectIdValidationPipe)
  async updateCandidate(
    @Param('candidateId') candidateId: string,
    @Body() updateCandidateDto: CandidateDto,
  ): Promise<CandidateResponse> {
    const candidate = await this.candidateService.getCandidate(candidateId);

    if (!candidate) {
      throw new NotFoundException([`Candidate with id ${candidateId} doesn't exist`]);
    }

    return await this.candidateService.updateCandidate(candidateId, updateCandidateDto);
  }

  @Delete('/:candidateId')
  @UsePipes(ObjectIdValidationPipe)
  async deleteCandidate(
    @Param('candidateId') candidateId: string,
  ): Promise<CandidateResponse> {
    const candidate = await this.candidateService.getCandidate(candidateId);

    if (!candidate) {
      throw new NotFoundException([`Candidate with id ${candidateId} doesn't exist`]);
    }

    return await this.candidateService.deleteCandidate(candidateId);
  }
}
