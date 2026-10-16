import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Booking } from '../model/types';
import { GAMING_ZONES } from '@/shared/config/zones';

export interface BookingItemProps {
  booking: Booking;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BookingItem: React.FC<BookingItemProps> = ({
  booking,
  onToggle,
  onDelete,
}) => {
  const zone = GAMING_ZONES.find((z) => z.id === booking.zoneId);

  const handleDeletePress = () => {
    Alert.alert(
      'Видалення',
      `Ви дійсно бажаєте видалити бронювання для гравця "${booking.playerName}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => onDelete(booking.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.item,
        booking.done ? styles.itemDone : styles.itemActive,
      ]}
    >
      {/* Натискний контейнер вмісту бронювання */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => onToggle(booking.id)}
        activeOpacity={0.7}
      >
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.playerName,
              booking.done && styles.playerNameDone,
            ]}
            numberOfLines={1}
          >
            {booking.playerName}
          </Text>

          {/* Бейдж статусу */}
          <View
            style={[
              styles.statusBadge,
              booking.done ? styles.statusBadgeDone : styles.statusBadgeActive,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                booking.done ? styles.statusTextDone : styles.statusTextActive,
              ]}
            >
              {booking.done ? 'Виконано' : 'Активне'}
            </Text>
          </View>
        </View>

        {/* Інформація про зону та місце */}
        <View style={styles.metaRow}>
          <View
            style={[
              styles.zoneTag,
              { backgroundColor: zone ? zone.bgColor : '#e2e8f0' },
            ]}
          >
            <Text
              style={[
                styles.zoneTagText,
                { color: zone ? zone.color : '#475569' },
              ]}
            >
              {zone?.shortName || booking.zoneName}
            </Text>
          </View>

          <Text style={styles.metaText}>ПК #{booking.pcNumber}</Text>
          <Text style={styles.metaDivider}>·</Text>
          <Text style={styles.metaText}>{booking.durationHours} год</Text>
          <Text style={styles.metaDivider}>·</Text>
          <Text style={styles.priceText}>{booking.price} ₴</Text>
        </View>

        {booking.notes ? (
          <Text style={styles.notesText} numberOfLines={1}>
            "{booking.notes}"
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* Кнопка видалення */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePress}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteButtonText}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  // Звичайний стан: блакитний фон за методичкою
  itemActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  // Виконаний стан: зелений фон за методичкою
  itemDone: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
    marginRight: 8,
  },
  playerNameDone: {
    textDecorationLine: 'line-through',
    color: '#15803d',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeActive: {
    backgroundColor: '#dbeafe',
  },
  statusBadgeDone: {
    backgroundColor: '#bbf7d0',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#1d4ed8',
  },
  statusTextDone: {
    color: '#166534',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  zoneTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  zoneTagText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  metaText: {
    fontSize: 13,
    color: '#475569',
  },
  metaDivider: {
    marginHorizontal: 6,
    color: '#94a3b8',
    fontSize: 13,
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  notesText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
