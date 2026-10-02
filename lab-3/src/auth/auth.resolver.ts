import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth-payload.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { description: 'Реєстрація нового користувача' })
  async register(
    @Args('name', { type: () => String }) name: string,
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<AuthPayload> {
    return this.authService.register(name, email, password);
  }

  @Mutation(() => AuthPayload, { description: 'Вхід існуючого користувача' })
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<AuthPayload> {
    return this.authService.login(email, password);
  }
}
