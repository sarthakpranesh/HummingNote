import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
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

export type HeaderProps = StackHeaderProps & {
    left: IconObject[];
    right: IconObject[];
}

const Header = ({left, right, ...props}: HeaderProps) => {

    return (
        <View
            style={styles.headerContainer}
            {...props} 
        >
            <View style={styles.headerLeftWrapper}>
                {
                    left.map(({onPress, name, isLabel, isFilled, cusColor}, index) => {
                        if (isLabel) {
                            return <TouchableOpacity key={`${index}`} onPress={onPress}>
                                <Text style={styles.headerLabel}>{name}</Text>
                            </TouchableOpacity>
                        }

                        return <TouchableOpacity key={`${index}`} onPress={onPress}>
                            <Svg name={name} isFilled={isFilled} cusColor={cusColor} style={styles.headerLabel}/>
                        </TouchableOpacity>
                    })
                }
            </View>
            <View style={styles.headerRightWrapper}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        width: Layout.isLargeDevice ? 300 * 3 : Layout.window.width,
    },
    headerRightWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerLeftWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default Header;
