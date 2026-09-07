import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsOptional } from 'class-validator';

@InputType()
export class CreateExperienceInput {
  @Field(() => Int)
  profileId: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  achievements?: string[];
}

@InputType()
export class UpdateExperienceInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  company?: string;

  @Field({ nullable: true })
  @IsOptional()
  position?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  achievements?: string[];
}
