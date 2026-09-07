import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Experiences } from './models/experience.model';
import { ExperienceService } from './experience.service';
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from './dto/experience.input';

@Resolver(() => Experiences)
export class ExperienceResolver {
  constructor(private experienceService: ExperienceService) {}
  @Query(() => [Experiences])
  async experiences(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.findAll(id);
  }
  @Query(() => Experiences)
  async experience(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.findOne(id);
  }
  @Mutation(() => Experiences)
  async createExperience(@Args('data') data: CreateExperienceInput) {
    return this.experienceService.create(data);
  }
  @Mutation(() => Experiences)
  async updateExperience(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateExperienceInput,
  ) {
    return this.experienceService.update(id, data);
  }
  @Mutation(() => Experiences)
  async deleteExperience(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.delete(id);
  }
}
