import React, {useEffect} from 'react';
import {Button, StyleSheet} from 'react-native';
import {View, Text} from '../../components/Themed';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//importing components
import GoogleSignIn from '../../components/GoogleSignIn';
import {authenticate} from '../../reducers/UserReducer';

const LoginScreen = (props: any) => {

    const onPress = () => {
        GoogleSignIn()
            .then((user) => {
                props.authenticate({email: user.email, uid: user.id})
            })
            .catch((err) => {
                console.log("@@@@@");
            })
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title="login" onPress={onPress} />
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
