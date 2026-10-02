import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Користувач системи CyberClub' })
export class User {
  @Field(() => ID, { description: 'Унікальний ідентифікатор' })
  id: string;

  @Field({ description: "Ім'я або нікнейм користувача" })
  name: string;

  @Field({ description: 'Електронна пошта користувача' })
  email: string;

  password?: string;
}
