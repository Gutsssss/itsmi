import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './models/projects.model';
import { ProjectService } from './projects.service';
import { CreateProjectInput, UpdateProjectInput } from './dto/projects.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => [Project])
  async projects(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findAll(id);
  }
  @Query(() => Project)
  async project(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }
  @Mutation(() => Project)
  async createProject(@Args('data') data: CreateProjectInput) {
    return this.projectService.create(data);
  }
  @Mutation(() => Project)
  async updateProject(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateProjectInput,
  ) {
    return this.projectService.update(id, data);
  }
  @Mutation(() => Project)
  async deleteProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.delete(id);
  }
}
