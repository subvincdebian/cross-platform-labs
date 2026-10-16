import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CyberClubScreen } from '@/pages/club-bookings';

export default function App() {
  return (
    <SafeAreaProvider>
      <CyberClubScreen />
    </SafeAreaProvider>
  );
}
