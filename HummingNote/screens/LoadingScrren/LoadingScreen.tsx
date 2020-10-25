import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';

const LoadingScreen = (props: any) => { 
    useEffect(() => {
        setTimeout(() => {
            props.hasLoaded();
        }, 500);
    }, [])   
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
