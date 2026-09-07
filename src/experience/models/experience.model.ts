import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experiences {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  profileId: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => [String], { nullable: true })
  achivments?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
