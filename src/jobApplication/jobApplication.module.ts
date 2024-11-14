import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { JobApplicationController } from './jobApplication.controller';
import { JobApplicationService } from './jobApplication.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
