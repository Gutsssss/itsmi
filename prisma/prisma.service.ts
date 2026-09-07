import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma подключен к PostgreSQL');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Prisma отключен от PostgreSQL');
  }
}
