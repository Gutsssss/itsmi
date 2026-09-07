import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Skill } from './models/skills.model';
import { SkillsService } from './skills.service';
import { AddSkillToProfile, CreateSkillInput } from './dto/skills.input';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private skillService: SkillsService) {}

  @Query(() => [Skill])
  async skills() {
    return this.skillService.findAll();
  }
  @Query(() => Skill, { nullable: true })
  async skill(@Args('id', { type: () => Int }) id: number) {
    return this.skillService.findOne(id);
  }

  @Mutation(() => Skill)
  async createSkill(@Args('data') data: CreateSkillInput) {
    return this.skillService.create(data);
  }
  @Mutation(() => Skill)
  async addSkillToProfile(@Args('data') data: AddSkillToProfile) {
    return this.skillService.addToProfile(data);
  }
  @Mutation(() => Skill)
  async removeSkillFromProfile(@Args('data') data: AddSkillToProfile) {
    return this.skillService.deleteFromProfile(data);
  }
  @Mutation(() => Skill)
  async deleteSkill(@Args('id', { type: () => Int }) id: number) {
    return this.skillService.delete(id);
  }
}
