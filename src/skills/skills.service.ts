import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddSkillToProfile, CreateSkillInput } from './dto/skills.input';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany();
  }
  async findOne(id: number) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      throw new HttpException(
        `Скилл с id:${id} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }
    return skill;
  }

  async create(data: CreateSkillInput) {
    return this.prisma.skill.create({ data });
  }

  async addToProfile(data: AddSkillToProfile) {
    await this.prisma.profile.findUniqueOrThrow({
      where: { id: data.profileId },
    });

    await this.prisma.skill.findUniqueOrThrow({
      where: { id: data.skillId },
    });

    return this.prisma.profile.update({
      where: { id: data.profileId },
      data: { skills: { connect: { id: data.skillId } } },
      include: {
        skills: true,
      },
    });
  }
  async deleteFromProfile(data: AddSkillToProfile) {
    return this.prisma.profile.update({
      where: { id: data.profileId },
      data: { skills: { disconnect: { id: data.skillId } } },
      include: { skills: true },
    });
  }
  async delete(id: number) {
    await this.prisma.skill.delete({ where: { id } });
  }
}
