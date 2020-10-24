import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect, useContext} from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// importing screens
import LoadingScreen from '../screens/LoadingScrren/LoadingScreen';

import GoogleSignIn from '../components/GoogleSignIn';
import {getData, storeData} from '../components/AsyncStorage';
import { GoogleUser } from 'expo-google-app-auth';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    Promise.all([getData("uid"), getData("email")])
      .then(([uid, email]) => {
        if (uid === null) {
          GoogleSignIn()
            .then((user) => {
              // storeData(user.id, user.email);
              // setUser({uid: user.id, user.email})
            })
        } else {
          setUser({uid, email})
        }
      })
  }, [])

  console.log("User:", user);

  if (!loaded) {
    return <LoadingScreen />
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
