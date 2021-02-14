import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {ColorSchemeName, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// importing screens
import SplashScreen from '../screens/SplashScreen/SplashScreen';

// importing Components
import fetchNotes from '../components/Server/fetchNotes';
import {update} from '../reducers/NoteReducer';

// importing Navigators
import DrawerNavigator from './DrawerNavigator';

enableScreens();

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const mapStateToProps = (state: any) => {
  const {user} = state.userReducer;
  return user;
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    update,
  }, dispatch)
);

const RootNavigator = connect(mapStateToProps, mapDispatchToProps)((props: any) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const SyncReduxAndServer = () => {
    fetchNotes(props.uid)
      .then((data) => {
        if (data.status === 1) {
          props.update(data.notes)
        } else {
          console.log("Root Navigator - SyncReduxAndServer: Request Status not 1:", data);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message)
      })
  }

  useEffect(() => {
    if (!props.authenticated) {
      clearInterval();
      return;
    }
    SyncReduxAndServer()
    setInterval(SyncReduxAndServer, 300000)
  }, [props.authenticated])

  return !loaded || !props.authenticated ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="splash">
        {(p) => <SplashScreen hasLoaded={() => setLoaded(true)} {...p} />}
      </Stack.Screen>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Drawer"
    >
      <Stack.Screen
        name="Drawer"
        {...props}
      >
        {(p) => <DrawerNavigator SyncReduxAndServer={SyncReduxAndServer} {...p} />}
      </Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
})

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
