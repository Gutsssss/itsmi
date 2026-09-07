import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Experiences } from 'src/experience/models/experience.model';
import { Project } from 'src/projects/models/projects.model';
import { Skill } from 'src/skills/models/skills.model';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  github?: string;

  @Field({ nullable: true })
  linkedin?: string;

  @Field(() => [Skill], { nullable: true })
  skills?: Skill[];

  @Field(() => [Experiences], { nullable: true })
  experiences?: Experiences[];

  @Field(() => [Project], { nullable: true })
  projects?: Project[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
