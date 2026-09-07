import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsUrl } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field(() => Int)
  profileId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  url?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @Field(() => [String])
  technologies: string[];
}

@InputType()
export class UpdateProjectInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  technologies?: string[];
}
