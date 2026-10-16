import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Booking, BookingItem, BookingStatusFilter } from '@/entities/booking';
import { BookingFilters } from '@/features/filter-bookings';

export interface BookingListProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
  filteredBookings: Booking[];
  search: string;
  onSearchChange: (text: string) => void;
  status: BookingStatusFilter;
  onStatusChange: (status: BookingStatusFilter) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  totalCount,
  activeCount,
  completedCount,
  filteredBookings,
  search,
  onSearchChange,
  status,
  onStatusChange,
  onToggle,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Список бронювань</Text>

      {totalCount === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Бронювань поки немає. Додайте перше!
          </Text>
        </View>
      ) : (
        <>
          {/* Фіча фільтрації та швидкого пошуку */}
          <BookingFilters
            search={search}
            onSearchChange={onSearchChange}
            status={status}
            onStatusChange={onStatusChange}
            totalCount={totalCount}
            activeCount={activeCount}
            completedCount={completedCount}
          />

          <Text style={styles.hintText}>
            Торкніться бронювання, щоб позначити його виконаним.
          </Text>

          {filteredBookings.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                За заданим запитом нічого не знайдено.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredBookings}
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
          )}
        </>
      )}
    </View>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  card: {
    flex: 1, // Займає весь вільний простір екрана під формою за методичкою
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    marginBottom: 8,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  noResultsText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 8,
  },
});
