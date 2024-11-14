import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';

@Module({
  imports: [PrismaModule],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
