import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NewBookingPayload } from '@/entities/booking';
import { GAMING_ZONES, GamingZone } from '@/shared/config/zones';

export interface BookingFormProps {
  onAdd: (booking: NewBookingPayload) => boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onAdd }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState(GAMING_ZONES[0].id);
  const [pcNumber, setPcNumber] = useState('1');
  const [durationHours, setDurationHours] = useState('2');
  const [notes, setNotes] = useState('');

  const currentZone =
    GAMING_ZONES.find((z) => z.id === selectedZoneId) || GAMING_ZONES[0];

  const parsedDuration = parseInt(durationHours, 10) || 1;
  const parsedPc = parseInt(pcNumber, 10) || 1;
  const totalPrice = parsedDuration * currentZone.ratePerHour;

  const handleAdd = () => {
    // 1. Валідація порожнього поля (або лише пробіли)
    if (!playerName.trim()) {
      Alert.alert('Помилка', 'Будь ласка, введіть нікнейм гравця.');
      return false;
    }

    // 2. Валідація номера ПК для обраної зони
    if (parsedPc <= 0 || parsedPc > currentZone.totalPcs) {
      Alert.alert(
        'Помилка',
        `Номер ПК для зони "${currentZone.shortName}" має бути від 1 до ${currentZone.totalPcs}.`
      );
      return false;
    }

    // 3. Валідація тривалості
    if (parsedDuration <= 0) {
      Alert.alert('Помилка', 'Тривалість сесії має становити щонайменше 1 годину.');
      return false;
    }

    const payload: NewBookingPayload = {
      playerName: playerName.trim(),
      zoneId: currentZone.id,
      zoneName: currentZone.name,
      pcNumber: parsedPc,
      durationHours: parsedDuration,
      price: totalPrice,
      notes: notes.trim() || undefined,
      done: false,
    };

    const isSuccess = onAdd(payload);

    if (isSuccess) {
      // Очищення форми та системне сповіщення про успіх за методичкою
      setPlayerName('');
      setNotes('');
      Alert.alert('Успіх', 'Бронювання успішно додано.');
      return true;
    }

    return false;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Додати бронювання</Text>

      {/* Поле нікнейму гравця */}
      <TextInput
        style={styles.input}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Введіть нікнейм гравця"
        placeholderTextColor="#94a3b8"
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />

      {/* Селектор ігрових зон */}
      <Text style={styles.label}>Ігрова зона:</Text>
      <View style={styles.zonesContainer}>
        {GAMING_ZONES.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <TouchableOpacity
              key={zone.id}
              style={[
                styles.zoneButton,
                isSelected && {
                  backgroundColor: zone.bgColor,
                  borderColor: zone.color,
                },
              ]}
              onPress={() => {
                setSelectedZoneId(zone.id);
                // Коригуємо номер ПК, якщо він перевищує ліміт нової зони
                if (parsedPc > zone.totalPcs) {
                  setPcNumber('1');
                }
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.zoneButtonText,
                  isSelected && { color: zone.color, fontWeight: 'bold' },
                ]}
              >
                {zone.shortName} ({zone.ratePerHour} ₴)
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Рядок числових параметрів: ПК та Тривалість */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>ПК # (1 - {currentZone.totalPcs}):</Text>
          <TextInput
            style={styles.inputSmall}
            value={pcNumber}
            onChangeText={setPcNumber}
            keyboardType="numeric"
            placeholder="Номер ПК"
            placeholderTextColor="#94a3b8"
            returnKeyType="done"
          />
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Годин гри:</Text>
          <TextInput
            style={styles.inputSmall}
            value={durationHours}
            onChangeText={setDurationHours}
            keyboardType="numeric"
            placeholder="Години"
            placeholderTextColor="#94a3b8"
            returnKeyType="done"
          />
        </View>
      </View>

      {/* Розрахунок вартості */}
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>
          Тариф: {parsedDuration} год × {currentZone.ratePerHour} ₴/год
        </Text>
        <Text style={styles.priceTotal}>До сплати: {totalPrice} ₴</Text>
      </View>

      {/* Кнопка додавання */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>Додати бронювання</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },
  zonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  zoneButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  zoneButtonText: {
    fontSize: 12,
    color: '#475569',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  col: {
    flex: 1,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  priceTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
