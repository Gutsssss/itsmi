import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateSkillInput {
  @Field()
  @MinLength(2)
  name: string;

  @Field()
  category: string;
}

@InputType()
export class AddSkillToProfile {
  @Field(() => Int)
  profileId: number;

  @Field(() => Int)
  skillId: number;
}
