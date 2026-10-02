import { Args, Float, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './models/booking.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/models/user.model';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Query(() => [Booking], { description: 'Отримати список усіх активних бронювань кіберклубу' })
  async bookings(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Query(() => [Booking], {
    description: 'Аліас для сумісності з прикладом методички (notes)',
  })
  async notes(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking, { nullable: true, description: 'Отримати бронювання за ID' })
  async booking(@Args('id', { type: () => ID }) id: string): Promise<Booking | undefined> {
    return this.bookingsService.findById(id);
  }

  @Mutation(() => Booking, {
    description: 'Створити нове бронювання місця (доступно лише авторизованому користувачу)',
  })
  @UseGuards(GqlAuthGuard)
  async createBooking(
    @Args('zone', { type: () => String }) zone: string,
    @Args('pcNumber', { type: () => Int }) pcNumber: number,
    @Args('durationHours', { type: () => Int }) durationHours: number,
    @Args('price', { type: () => Float }) price: number,
    @Args('notes', { type: () => String, nullable: true }) notes?: string,
    @CurrentUser() user?: User,
  ): Promise<Booking> {
    return this.bookingsService.create(zone, pcNumber, durationHours, price, notes, user!);
  }

  @Mutation(() => Booking, {
    description: 'Створення нотатки/бронювання за шаблоном методички createNote(title, text)',
  })
  @UseGuards(GqlAuthGuard)
  async createNote(
    @Args('title', { type: () => String }) title: string,
    @Args('text', { type: () => String }) text: string,
    @CurrentUser() user?: User,
  ): Promise<Booking> {
    return this.bookingsService.create(title, 1, 1, 100, text, user!);
  }

  @Mutation(() => Boolean, {
    description: 'Видалити бронювання за ID (доступно лише авторизованому користувачу)',
  })
  @UseGuards(GqlAuthGuard)
  async deleteBooking(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.bookingsService.delete(id);
  }

  @Mutation(() => Boolean, {
    description: 'Аліас для deleteNote за шаблоном методички',
  })
  @UseGuards(GqlAuthGuard)
  async deleteNote(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.bookingsService.delete(id);
  }
}
