import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/projects.input';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async findAll(profileId: number) {
    if (profileId) {
      return this.prisma.project.findMany({ where: { profileId } });
    }
    return this.prisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new HttpException(
        `Проекта с id:${id} не найдено`,
        HttpStatus.NOT_FOUND,
      );
    }
    return project;
  }
  async create(data: CreateProjectInput) {
    return this.prisma.project.create({ data });
  }

  async update(id: number, data: UpdateProjectInput) {
    try {
      await this.findOne(id);
      return this.prisma.project.update({ where: { id }, data });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
  async delete(id: number) {
    try {
      await this.findOne(id);
      return this.prisma.project.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
