import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface HeaderProps {
  total: number;
  done: number;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  total,
  done,
  title = 'CyberClub Mobile',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.stats}>
        Усього бронювань: {total} · Виконано: {done}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d4ed8',
    textAlign: 'center',
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
});
