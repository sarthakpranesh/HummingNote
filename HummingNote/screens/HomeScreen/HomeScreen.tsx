import React from 'react';
import {Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';

// importing components
import Divider from '../../components/Divider/Divider';
import {logout} from '../../reducers/UserReducer';

//importing Styles
import Styles from '../../constants/Styles';

const HomeScreen = (props: any) => {
  return (
    <View style={Styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Divider />
      <EditScreenInfo path="/screens/TabOneScreen.js" />
      <Button onPress={() => props.logout()} title="logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: any) => {
  const {user} = state.userReducer;
  return user;
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    logout,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
