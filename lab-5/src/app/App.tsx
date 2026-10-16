import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/shared/lib/alertPolyfill';
import { CyberClubScreen } from '@/pages/club-bookings';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <CyberClubScreen />
    </SafeAreaProvider>
  );
};

export default App;
