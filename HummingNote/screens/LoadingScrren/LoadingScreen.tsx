import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text, View} from '../../components/Themed';

//importing components
import GoogleSignIn from '../../components/GoogleSignIn';
import {authenticate} from '../../reducers/UserReducer';

const LoadingScreen = (props: any) => {

    useEffect(() => {
        console.log("Is User Authenticated:", props.authenticated);
        if (props.authenticated) {
            props.hasLoaded();
            return;
        }
        GoogleSignIn()
            .then((user) => {
                props.authenticate({email: user.email, uid: user.id})
            })
            .catch((err) => {
                console.log("@@@@@");
            })
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

const mapStateToProps = (state: any) => {
    const {user} = state.userReducer;
    return user;
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      authenticate,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
