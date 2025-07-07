import { Module } from '@nestjs/common';
import { JapController } from './jap.controller';
import { JapService } from './jap.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [JapController],
  providers: [JapService],
})
export class JapModule {}
