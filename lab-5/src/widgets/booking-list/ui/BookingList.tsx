import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Booking, BookingItem } from '@/entities/booking';

export interface BookingListProps {
  bookings: Booking[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onToggle,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Список бронювань</Text>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Бронювань поки немає. Додайте перше!
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.hintText}>
            Торкніться бронювання, щоб позначити його виконаним.
          </Text>

          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookingItem
                booking={item}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            )}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </>
      )}
    </View>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  card: {
    flex: 1, // Займає весь вільний простір екрана під формою
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    // Тінь для iOS
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Тінь для Android
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 8,
  },
});
