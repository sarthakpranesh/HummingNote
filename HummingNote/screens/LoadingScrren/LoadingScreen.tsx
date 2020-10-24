import React from 'react';
import {StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>HummingNote</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default LoadingScreen;
