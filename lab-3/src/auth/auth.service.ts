import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthPayload } from './dto/auth-payload.model';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string): Promise<AuthPayload> {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Користувач з таким email вже існує.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create(name, email, hashedPassword);
    const token = this.jwtService.sign({
      sub: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    return { token, user: newUser };
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Користувача не знайдено або пароль невірний.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Користувача не знайдено або пароль невірний.');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);
      if (!payload || !payload.sub) {
        return null;
      }
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        return null;
      }
      return { id: user.id, name: user.name, email: user.email };
    } catch {
      return null;
    }
  }
}
