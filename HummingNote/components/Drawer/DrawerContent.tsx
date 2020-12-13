import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

// import components
import {DrawerItem} from '../Themed';

const DrawerContent = (props: any) => {

    return (
        <DrawerContentScrollView {...props}>
            <Image style={styles.drawerImage} source={require('../../assets/images/icon.png')} />
            <DrawerItem label="Home" onPress={() => props.navigation.navigate("Home")} />
            <DrawerItem label="Labels (Coming Soon)" onPress={() => console.log('Label')} />
            <DrawerItem label="Settings" onPress={() => props.navigation.navigate("Settings")} />
            <DrawerItem label="About (Coming Soon)" onPress={() => console.log('About')} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 40,
    }
});

export default DrawerContent;