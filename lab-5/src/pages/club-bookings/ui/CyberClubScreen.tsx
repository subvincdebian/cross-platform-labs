import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Header } from '@/widgets/header';
import { BookingForm } from '@/widgets/booking-form';
import { BookingList } from '@/widgets/booking-list';
import { Booking, NewBookingPayload } from '@/entities/booking';

export const CyberClubScreen: React.FC = () => {
  // 1. Початковий стан із демонстраційними записами або порожній масив
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'demo-1',
      playerName: 's1mple',
      zoneId: 'vip',
      zoneName: 'VIP Lounge (ПК #21-30)',
      pcNumber: 23,
      durationHours: 3,
      price: 270,
      notes: 'Faceit Major розминка',
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      playerName: 'b1t',
      zoneId: 'bootcamp',
      zoneName: 'Boot Camp 5x5 (Team Room)',
      pcNumber: 2,
      durationHours: 4,
      price: 480,
      done: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  // 2. Додавання бронювання: створення об'єкта та додавання на початок списку
  const handleAddBooking = (payload: NewBookingPayload): boolean => {
    const newBooking: Booking = {
      ...payload,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setBookings((currentBookings) => [newBooking, ...currentBookings]);
    return true;
  };

  // 3. Зміна статусу виконання (toggle)
  const handleToggleStatus = (id: string) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, done: !booking.done } : booking
      )
    );
  };

  // 4. Видалення бронювання зі списку
  const handleDeleteBooking = (id: string) => {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== id)
    );
    Alert.alert('Видалення', 'Бронювання успішно видалено.');
  };

  // 5. Підрахунок кількості виконаних та загальної кількості
  const totalCount = bookings.length;
  const completedCount = bookings.filter((b) => b.done).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header total={totalCount} done={completedCount} />
        <BookingForm onAdd={handleAddBooking} />
        <BookingList
          bookings={bookings}
          onToggle={handleToggleStatus}
          onDelete={handleDeleteBooking}
        />
      </View>
    </SafeAreaView>
  );
};

export default CyberClubScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eff6ff', // Світло-блакитний фон за методичкою
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
