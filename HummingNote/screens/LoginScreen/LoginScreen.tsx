import React, { useReducer } from 'react';
import {Alert, Button, StyleSheet} from 'react-native';
import {View} from '../../components/Themed';
import Svg, {Path} from 'react-native-svg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//importing components
import GoogleSignIn from '../../components/GoogleSignIn';
import {authenticate} from '../../reducers/UserReducer';

//importing constants
import BackendAPI from '../../constants/APIs';
import Styles from '../../constants/Styles';
import * as HmSvg from '../../constants/HummingNoteSvg';

const LoginScreen = (props: any) => {
    const onPress = () => {
        GoogleSignIn()
            .then((user: any) => {
                return BackendAPI({route: "auth", method: "POST", body: {email: user.email, uid: user.id}})
            })
            .then((respJson) => respJson.json())
            .then((resp: any) => {
                if (resp.status === 1) {
                    props.authenticate({email: resp.Payload.user.email, uid: resp.Payload.user.uid})
                } else {
                    Alert.alert(
                        "Authentication",
                        resp.message,
                        [{text: "Exit", onPress: () => console.log('exit')}],
                        {cancelable: false,}
                    )
                }
            })
            .catch((err) => {
                console.log("Login Screen Error:", err.message);
                console.log("@@@@@@@@@@@@@@@@");
            })
    }

    return (
        <View style={Styles.container}>
            <Svg width={HmSvg.width} height={HmSvg.height} viewBox={`0 0 ${HmSvg.viewBoxWidth} ${HmSvg.viewBoxHight}`}>
                {HmSvg.path.map((d, key) => (
                    <Path stroke="white" strokeWidth={10} d={d} key={key} />
                ))
                }
            </Svg>
            <View style={styles.btnAbsolute}>
                <Button onPress={onPress} title="Continue With Google" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAbsolute: {
        position: "absolute",
        bottom: 40,
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
})

const mapStateToProps = (state: any) => {
    const {user} = state.userReducer;
    return user;
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      authenticate,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
