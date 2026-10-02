import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { description: 'Список усіх зареєстрованих користувачів' })
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, {
    nullable: true,
    description: 'Дані поточного авторизованого користувача (або null без токена)',
  })
  async me(@CurrentUser() currentUser?: User): Promise<User | null> {
    if (!currentUser || !currentUser.id) {
      return null;
    }
    const user = await this.usersService.findById(currentUser.id);
    return user ? { id: user.id, name: user.name, email: user.email } : null;
  }
}
