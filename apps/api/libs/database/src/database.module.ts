// /Users/thiagotavares/Projects/Services/libs/database/src/database.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryService } from './category.service';

@Global()
@Module({
  providers: [PrismaService, CategoryService],
  exports: [PrismaService, CategoryService],
})
export class DatabaseModule {}
