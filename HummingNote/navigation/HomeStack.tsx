import React from 'react';
import {
    createStackNavigator,
    TransitionSpecs,
    CardStyleInterpolators,
} from '@react-navigation/stack';

// importing types
import {HomeStackParamList} from '../types';

// importing screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import NoteScreen from '../screens/NoteScreen/NoteScreen';
import AddNoteScreen from '../screens/AddNoteScreen/AddNoteScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = (props: any) => {
    const SyncReduxAndServer = props.SyncReduxAndServer;

    const screenOptions = {
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // animationEnabled: true,
        transitionSpec: {
            animation: 'spring',
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
        },
    };

    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={screenOptions}
            initialRouteName="Home"
            lazy={false}
        >
            <Stack.Screen
                name="Home"
            >
                {(p) => <HomeScreen SyncReduxAndServer={SyncReduxAndServer} {...p} />}
            </Stack.Screen>
            <Stack.Screen
                name="Note"
            >
                {(p) => <NoteScreen SyncReduxAndServer={SyncReduxAndServer} {...p} />}
            </Stack.Screen>
            <Stack.Screen
                name="AddNote"
            >
                {(p) => <AddNoteScreen SyncReduxAndServer={SyncReduxAndServer}  {...p}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default HomeStack;
