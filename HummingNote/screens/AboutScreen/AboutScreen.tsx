import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

// importing components
import {SafeAreaView, Text, View} from '../../components/Themed';
import Header from '../../components/Header/Header';

// importing constants
import Styles from '../../constants/Styles';

// importing types
import {AboutScreenProps} from '../../types';

const AboutScreen = (props: AboutScreenProps) => {

    return (
        <SafeAreaView style={[Styles.mainContainer, {alignItems: 'center'}]}>
            <Header
                left={[{
                    name: "Back",
                    onPress: () => props.navigation.goBack(),
                }]}
                right={[]}
            />
            <View style={Styles.container}>
                <Image style={Styles.hummingImageLogo} source={require('../../assets/images/icon.png')} />
                <Text style={{fontSize: 24}}>
                    Humming Note
                </Text>
                <Text>
                    v{Constants.nativeAppVersion}
                </Text>
                <Text style={style.aboutText}>
                    Open source Note taking app inspired from Google Keep and Hummingbird
                </Text>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    aboutText: {
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
})

export default AboutScreen;
