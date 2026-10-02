import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType({ description: 'Бронювання ігрового місця в кіберклубі CyberClub' })
export class Booking {
  @Field(() => ID, { description: 'Унікальний ідентифікатор бронювання' })
  id: string;

  @Field({ description: 'Ігрова зона клубу (наприклад, VIP Lounge, Boot Camp)' })
  zone: string;

  @Field(() => Int, { description: 'Номер комп’ютера (ПК)' })
  pcNumber: number;

  @Field(() => Int, { description: 'Тривалість гри (години)' })
  durationHours: number;

  @Field(() => Float, { description: 'Загальна вартість оренди' })
  price: number;

  @Field({ description: 'Статус бронювання (active, completed, cancelled)' })
  status: string;

  @Field({ nullable: true, description: 'Додаткові побажання чи коментар' })
  notes?: string;

  @Field(() => User, { description: 'Користувач (гравець), який забронював місце' })
  user: User;

  @Field(() => User, {
    description: 'Автор запису (для зворотної сумісності з прикладом методички)',
  })
  get author(): User {
    return this.user;
  }
}
