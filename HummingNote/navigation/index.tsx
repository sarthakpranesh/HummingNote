import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import React, {useState} from 'react';
import {ColorSchemeName} from 'react-native';
import {connect} from 'react-redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// importing screens
import LoadingScreen from '../screens/LoadingScrren/LoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import NoteScreen from '../screens/NoteScreen/NoteScreen';

enableScreens();

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
const Stack = createSharedElementStackNavigator<RootStackParamList>();

const mapStateToProps = (state: any) => {
  const {user} = state.userReducer;
  return user;
}

const RootNavigator = connect(mapStateToProps)((props: any) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  if (!loaded) {
    return <LoadingScreen hasLoaded={() => setLoaded(true)}/>
  }

  if (!props.authenticated) {
    return <LoginScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        sharedElementsConfig={(route) => [
          {
            id: `item.${route.params.index}.title`,
            animation: 'move',
            align: 'auto',
            resize: 'auto',
          },
        ]}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: "spring",
              duration: 200,
            },
            close: {
              animation: "spring",
              duration: 200,
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            }
          },
        })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
})
