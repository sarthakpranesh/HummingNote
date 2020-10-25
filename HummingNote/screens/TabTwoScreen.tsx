import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//importing components
import Divider from '../components/Divider/Divider';

const TabTwoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Divider />
      <EditScreenInfo path="/screens/TabTwoScreen.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TabTwoScreen;
