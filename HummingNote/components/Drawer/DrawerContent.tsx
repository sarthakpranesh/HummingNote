import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Constants from 'expo-constants';

// importing components
import {DrawerItem, Text} from '../Themed';

// importing constants
import Styles from '../../constants/Styles';

const DrawerContent = (props: any) => {

    return (
        <>
        <DrawerContentScrollView {...props}>
            <Image style={Styles.hummingImageLogo} source={require('../../assets/images/icon.png')} />
            <DrawerItem label="Home" onPress={() => props.navigation.navigate("Home")} />
            <DrawerItem label="Labels (Coming Soon)" onPress={() => console.log('Label')} />
            <DrawerItem label="Settings" onPress={() => props.navigation.navigate("Settings")} />
            <DrawerItem label="About" onPress={() => props.navigation.navigate("About")} />
        </DrawerContentScrollView>
        <Text style={styles.drawerAppVersionInfo}>
            v{Constants.nativeAppVersion}
        </Text>
        </>
    )
}

const styles = StyleSheet.create({
    drawerAppVersionInfo: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

export default DrawerContent;