import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  profileId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  githubUrl?: string;

  @Field(() => [String])
  technologies: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
