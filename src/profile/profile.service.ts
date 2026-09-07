import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.input';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: { skills: true, experiences: true, projects: true },
    });
    if (!profile) {
      throw new HttpException('Профиль не найден', HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  async create(data: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...data,
      },
      include: { skills: true, experiences: true, projects: true },
    });
  }

  async update(id: number, data: UpdateProfileInput) {
    try {
      return this.prisma.profile.update({
        where: { id },
        data,
        include: { skills: true, experiences: true, projects: true },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException(`${error}`, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete(id: number) {
    await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.experience.deleteMany({
        where: { profileId: id },
      });

      await tx.project.deleteMany({
        where: { profileId: id },
      });

      await tx.profile.update({
        where: { id },
        data: {
          skills: {
            set: [],
          },
        },
      });

      return tx.profile.delete({
        where: { id },
      });
    });
  }
}
