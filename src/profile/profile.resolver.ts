import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  async profile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }
  @Mutation(() => Profile)
  async createProfile(@Args('data') data: CreateProfileInput) {
    return this.profileService.create(data);
  }
  @Mutation(() => Profile)
  async updateProfile(
    @Args('id') id: number,
    @Args('data') data: UpdateProfileInput,
  ) {
    return this.profileService.update(id, data);
  }
  @Mutation(() => Profile)
  async deleteProfile(@Args('id') id: number) {
    return this.profileService.delete(id);
  }
}
