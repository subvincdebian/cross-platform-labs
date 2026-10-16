import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BookingStatusFilter } from '@/entities/booking';

export interface BookingFiltersProps {
  search: string;
  onSearchChange: (text: string) => void;
  status: BookingStatusFilter;
  onStatusChange: (status: BookingStatusFilter) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  totalCount,
  activeCount,
  completedCount,
}) => {
  const tabs: { key: BookingStatusFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Всі', count: totalCount },
    { key: 'active', label: 'Активні', count: activeCount },
    { key: 'completed', label: 'Виконано', count: completedCount },
  ];

  return (
    <View style={styles.container}>
      {/* Сегментовані кнопки фільтрації */}
      <View style={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = status === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => onStatusChange(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  isActive && styles.tabButtonTextActive,
                ]}
              >
                {tab.label} ({tab.count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Пошук за нікнеймом */}
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={onSearchChange}
        placeholder="Пошук за нікнеймом..."
        placeholderTextColor="#94a3b8"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default BookingFilters;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 3,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  tabButtonTextActive: {
    color: '#1d4ed8',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
});
