import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerParamList} from '../types';

// importing screens
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

// importing navigators

import HomeStack from './HomeStack';

// importing Components
import DrawerContent from '../components/Drawer/DrawerContent';

// importing Constants
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

// Drawer Navigation will be used for everything after login and loading gets over
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      openByDefault={false}
      drawerStyle={{
        backgroundColor: Colors.dark.background,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
      lazy={false}
      drawerType={Layout.isLargeDevice ? 'permanent' : 'front'}
    >
      <Drawer.Screen
        name="HomeStack"
        {...props}
      >
        {(p) => <HomeStack SyncReduxAndServer={props.SyncReduxAndServer} {...p} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen} {...props} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;
