import React from 'react';
import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Svg, Text} from '../Themed';

//importing constants
import Layout from "../../constants/Layout";

interface IconObject {
    onPress: () => void;
    name: string;
    isFilled?: boolean;
    cusColor?: string;
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
                left.map(({onPress, name, isLabel, isFilled, cusColor}, index) => {
                    if (isLabel) {
                        return <TouchableOpacity key={`${index}`} onPress={onPress}>
                            <Text style={styles.headerLabel}>{name}</Text>
                        </TouchableOpacity>
                    }

                    return <TouchableOpacity key={`${index}`} onPress={onPress}>
                        <Svg name={name} isFilled={isFilled} cusColor={cusColor} />
                    </TouchableOpacity>
                })
            }
            <View style={styles.headerRightIcons}>
                {
                    right.map(({onPress, name, isFilled, cusColor}, index) => {
                        return <TouchableOpacity key={`${index}`} onPress={onPress}>
                            <Svg name={name} isFilled={isFilled} cusColor={cusColor} style={{marginRight: 20}} />
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
        paddingHorizontal: 10,
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
        marginLeft: 8,
    },
});

export default Header;
