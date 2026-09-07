import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsUrl, MinLength } from 'class-validator';
@InputType()
export class CreateProfileInput {
  @Field()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  github?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;
}
@InputType()
export class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  gitHub?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedIn?: string;
}
