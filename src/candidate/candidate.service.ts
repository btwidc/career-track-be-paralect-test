import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CandidateDto } from './dto/candidate.dto';
import { CandidateResponse } from './types/candidate.type';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) {}

  async getCandidates(): Promise<CandidateResponse[]> {
    return await this.prisma.candidate.findMany();
  }

  async getCandidate(id: string): Promise<CandidateResponse> {
    return await this.prisma.candidate.findUnique({
      where: {
        id,
      },
    });
  }

  async createCandidate(
    createCandidateDto: CandidateDto,
  ): Promise<CandidateResponse> {
    return await this.prisma.candidate.create({
      data: {
        ...createCandidateDto,
      },
    });
  }

  async updateCandidate(
    id: string,
    updateCandidateDto: CandidateDto,
  ): Promise<CandidateResponse> {
    return await this.prisma.candidate.update({
      where: {
        id,
      },
      data: {
        ...updateCandidateDto,
      },
    });
  }

  async deleteCandidate(id: string): Promise<CandidateResponse> {
    return await this.prisma.candidate.delete({
      where: {
        id,
      },
    });
  }
}
