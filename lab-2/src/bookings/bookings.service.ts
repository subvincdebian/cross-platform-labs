import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Бронювання з ID "${id}" не знайдено`);
    }
    return booking;
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updated = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, { new: true, runValidators: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Бронювання з ID "${id}" не знайдено`);
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string; id: string }> {
    const deleted = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Бронювання з ID "${id}" не знайдено`);
    }
    return {
      message: 'Бронювання успішно видалено',
      id,
    };
  }
}
