import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from './dto/experience.input';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll(profileId: number) {
    if (profileId) {
      return this.prisma.experience.findMany({
        where: { profileId },
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async findOne(id: number) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) {
      throw new HttpException(
        `Опыт с таким ID:${id} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }
    return experience;
  }

  async create(data: CreateExperienceInput) {
    return this.prisma.experience.create({ data });
  }

  async update(id: number, data: UpdateExperienceInput) {
    try {
      await this.findOne(id);
      return this.prisma.experience.update({ where: { id }, data });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
