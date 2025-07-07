// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional: makes it available globally without importing
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 export it so other modules can use it
})
export class PrismaModule {}
