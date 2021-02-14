import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from '../../components/Themed';
import Svg from  'react-native-svg';
import Animated, {
    Easing,
    interpolate,
    useAnimatedProps,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

//importing components
import WebGoogleSignIn from '../../components/WebGoogleSignIn';
import {authenticate} from '../../reducers/UserReducer';

//importing constants
import BackendAPI from '../../constants/APIs';
import AnimatedStroke from '../../components/AnimatedStroke/AnimatedStroke';

//importing Styles
import Styles from '../../constants/Styles';
import * as HmSvg from '../../constants/HummingNoteSvg';

const mapStateToProps = (state: any) => {
    const {user} = state.userReducer;
    return user;
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      authenticate,
    }, dispatch)
);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type LoadingScreenProps = ConnectedProps<typeof connector> & {
    hasLoaded: () => void;
}

const SplashScreen = (props: LoadingScreenProps) => {
    const progress = useSharedValue(0);
    const animateIn = useSharedValue(0);

    const onGetUser = (user: any) => {
        console.log("From Splash Screen - Got Data:", user);
        BackendAPI({route: "auth", method: "POST", body: {email: user.email, uid: user.id}})
            .then((j) => j.json())
            .then((j) => {
                if (j.status === 1) {
                    props.authenticate({email: j.Payload.user.email, uid: j.Payload.user.uid});
                    callHasLoaded();
                } else {
                    Alert.alert(
                        "Authentication",
                        j.message,
                        [{text: "Exit", onPress: () => console.log('exit')}],
                        {cancelable: false,}
                    )
                }
            })
            .catch((error) => {
                console.log("Backend API:", error);
            })
        // callHasLoaded();
    }

    const callHasLoaded = () => {
        props.hasLoaded();
    }

    useEffect(() => {
        progress.value = withTiming(1, {duration: 4000, easing: Easing.linear}, (ended) => {
            if (ended && props.authenticated === false) {
                animateIn.value = withSpring(1);
            } else if (props.authenticated) {
                runOnJS(callHasLoaded)();
            }
        });
    }, [progress]);

    const animatedButtonProps = useAnimatedProps(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        animateIn.value,
                        [0, 1],
                        [100, 0],
                    ),
                },
            ],
        }
    });
    
    return (
        <SafeAreaView style={Styles.container}>
            <Svg width={HmSvg.width} height={HmSvg.height} viewBox={`0 0 ${HmSvg.viewBoxWidth} ${HmSvg.viewBoxHight}`}>
                {
                    HmSvg.path.map((d, key) => (
                        <AnimatedStroke progress={progress} d={d} key={key} />
                    ))
                }
            </Svg>
            {
                !props.authenticated ? (
                    <Animated.View
                        style={[
                            styles.btnAbsolute,
                            animatedButtonProps,
                        ]}
                    >
                        <WebGoogleSignIn onGetUser={onGetUser} />
                    </Animated.View>
                ) : null
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    btnAbsolute: {
        position: "absolute",
        bottom: 40,
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
});

export default connector(SplashScreen);
