import React from 'react';
import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Feather, Text} from '../Themed';

//importing constants
import Layout from "../../constants/Layout";

interface IconObject {
    onPress: () => void;
    name: string;
    isLabel?: boolean;
}

interface HeaderProps {
    left: IconObject [];
    right: IconObject [];
}

const Header = ({left, right}: HeaderProps) => {

    return (
        <View style={styles.headerContainer}>
            {
                left.map(({onPress, name, isLabel}, index) => {
                    if (isLabel) {
                        return <TouchableOpacity key={`${index}`} onPress={onPress}>
                            <Text style={styles.headerLabel}>{name}</Text>
                        </TouchableOpacity>
                    }

                    return <TouchableOpacity key={`${index}`} onPress={onPress}>
                        <Feather name={name} size={24} />
                    </TouchableOpacity>
                })
            }
            <View style={styles.headerRightIcons}>
                {
                    right.map(({onPress, name}, index) => {
                        return <TouchableOpacity key={`${index}`} onPress={onPress}>
                            <Feather name={name} size={24} style={{marginRight: 20}} />
                        </TouchableOpacity>
                    })
                }
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
    },
    headerLabel: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;
