import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Imports: Redux Persist Persister
import {store, persister} from './stores/stores';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <Navigation colorScheme={colorScheme} />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
