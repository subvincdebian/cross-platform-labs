import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType({ description: 'Результат автентифікації користувача' })
export class AuthPayload {
  @Field({ description: 'JWT токен доступу' })
  token: string;

  @Field(() => User, { description: 'Дані користувача' })
  user: User;
}
