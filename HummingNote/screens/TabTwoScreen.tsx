import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//importing components
import Divider from '../components/Divider/Divider';

//importing styles
import Styles from '../constants/Styles';

const TabTwoScreen = () => {
  return (
    <View style={Styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Divider />
      <EditScreenInfo path="/screens/TabTwoScreen.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TabTwoScreen;
