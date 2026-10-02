import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 's1mple_pro',
      email: 's1mple@cyberclub.ua',
      password: bcrypt.hashSync('123456', 10),
    },
  ];

  private currentId = 1;

  async findAll(): Promise<User[]> {
    return this.users.map(({ id, name, email }) => ({ id, name, email }));
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  async create(name: string, email: string, hashedPassword: string): Promise<User> {
    this.currentId += 1;
    const newUser: User = {
      id: this.currentId.toString(),
      name,
      email,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }
}
