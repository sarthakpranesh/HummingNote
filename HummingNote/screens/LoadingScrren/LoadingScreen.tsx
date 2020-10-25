import React, {useEffect} from 'react';
import {Text, View} from '../../components/Themed';

//importing Styles
import Styles from '../../constants/Styles';

const LoadingScreen = (props: any) => { 
    useEffect(() => {
        setTimeout(() => {
            props.hasLoaded();
        }, 500);
    }, [])   
    return (
        <View style={Styles.container}>
            <Text>HummingNote</Text>
        </View>
    )
}

export default LoadingScreen;
