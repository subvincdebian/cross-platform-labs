import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Header } from '@/widgets/header';
import { BookingForm } from '@/widgets/booking-form';
import { BookingList } from '@/widgets/booking-list';
import { Booking, NewBookingPayload, BookingStatusFilter } from '@/entities/booking';

export const CyberClubScreen: React.FC = () => {
  // 1. Початковий стан із демонстраційними записами
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

  // 2. Стан фільтрів
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>('all');

  // 3. Додавання нового бронювання
  const handleAddBooking = (payload: NewBookingPayload): boolean => {
    const newBooking: Booking = {
      ...payload,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setBookings((currentBookings) => [newBooking, ...currentBookings]);
    return true;
  };

  // 4. Перемикання статусу (done / active)
  const handleToggleStatus = (id: string) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, done: !booking.done } : booking
      )
    );
  };

  // 5. Видалення бронювання
  const handleDeleteBooking = (id: string) => {
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== id)
    );
    Alert.alert('Видалення', 'Бронювання успішно видалено.');
  };

  // 6. Обчислювані лічильники
  const totalCount = bookings.length;
  const activeCount = useMemo(
    () => bookings.filter((b) => !b.done).length,
    [bookings]
  );
  const completedCount = useMemo(
    () => bookings.filter((b) => b.done).length,
    [bookings]
  );

  // 7. Відфільтрований список "на льоту"
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        b.playerName.toLowerCase().includes(query) ||
        b.zoneName.toLowerCase().includes(query) ||
        (b.notes && b.notes.toLowerCase().includes(query)) ||
        b.pcNumber.toString().includes(query);

      let matchesStatus = true;
      if (statusFilter === 'active') matchesStatus = !b.done;
      if (statusFilter === 'completed') matchesStatus = b.done;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header total={totalCount} done={completedCount} />
        <BookingForm onAdd={handleAddBooking} />
        <BookingList
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
          filteredBookings={filteredBookings}
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
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
    backgroundColor: '#eff6ff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
