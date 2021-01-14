import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ColorSchemeName, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, DrawerParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// importing screens
import LoadingScreen from '../screens/LoadingScrren/LoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import NoteScreen from '../screens/NoteScreen/NoteScreen';
import AddNoteScreen from '../screens/AddNoteScreen/AddNoteScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import AboutScreen from '../screens/AboutScreen/AboutScreen';

// importing Components
import DrawerContent from '../components/Drawer/DrawerContent';
import fetchNotes from '../components/Server/fetchNotes';
import {update} from '../reducers/NoteReducer';

// importing Constants
import Colors from '../constants/Colors';

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

  if (!loaded) {
    return <LoadingScreen hasLoaded={() => setLoaded(true)}/>
  }

  if (!props.authenticated) {
    return <LoginScreen />
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="DrawerNavigator" >
      <Stack.Screen
        name="DrawerNavigator"
        {...props}
      >
        {(p) => <DrawerNavigator SyncReduxAndServer={SyncReduxAndServer} {...p} />}
      </Stack.Screen>
      <Stack.Screen
        name="Note"
      >
        {(p) => <NoteScreen SyncReduxAndServer={SyncReduxAndServer} {...p}/>}
      </Stack.Screen>
      <Stack.Screen
        name="AddNote"
      >
        {(p) => <AddNoteScreen SyncReduxAndServer={SyncReduxAndServer}  {...p}/>}
      </Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
})

// Drawer Navigation will be used for everything after login and loading gets over
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      openByDefault={false}
      drawerStyle={{
        backgroundColor: Colors.dark.background,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
      lazy={false}
    >
      <Drawer.Screen
        name="Home"
        {...props}
      >
        {(p) => <HomeScreen SyncReduxAndServer={props.SyncReduxAndServer} {...p} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen} {...props} />
      <Drawer.Screen name="About" component={AboutScreen} {...props} />
    </Drawer.Navigator>
  )
}
