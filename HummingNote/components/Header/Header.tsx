import React from 'react';
import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Feather} from '../Themed';

//importing constants
import Layout from "../../constants/Layout";

const Header = (props: any) => {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={props.goBack}>
                <Feather name="arrow-left" size={24} />
            </TouchableOpacity>
            <View style={styles.headerRightIcons}>
                <Feather name="flag" size={24} style={{marginRight: 20}} />
                <Feather name="bell" size={24} style={{marginRight: 20}} />
                <Feather name="archive" size={24} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: Layout.window.width,
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerRightIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default Header;
