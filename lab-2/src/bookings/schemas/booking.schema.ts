import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, trim: true })
  playerName!: string;

  @Prop({ required: true, trim: true })
  zone!: string;

  @Prop({ required: true, min: 1 })
  pcNumber!: number;

  @Prop({ required: true, min: 1 })
  durationHours!: number;

  @Prop({ required: true, min: 0 })
  price!: number;

  @Prop({ default: 'active', trim: true })
  status!: string;

  @Prop({ default: '', trim: true })
  notes!: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
