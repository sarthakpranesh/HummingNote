import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <StatusBar
              animated={true}
              hidden={false}
              translucent={false}
            />
            <Navigation colorScheme={colorScheme} />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
