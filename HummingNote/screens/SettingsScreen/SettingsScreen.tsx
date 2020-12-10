import React from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {View, Text, SafeAreaView} from '../../components/Themed';

// importing components
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider';
import {logout} from '../../reducers/UserReducer';
import {clear} from '../../reducers/NoteReducer';

// importing styles
import Styles from '../../constants/Styles';

const SettingsScreen = (props: any) => {
    return (
        <SafeAreaView>
        <View style={[Styles.mainContainer]}>
            <Header
                left={[{name: "Humming Note", isLabel: true, onPress: () => props.navigation.openDrawer()}]}
                right={[]}
            />
            <Divider />
            <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.innerContainer}>
                    <Text>Settings Page</Text>
                    <Button onPress={() => Promise.all([props.logout(), props.clear()])} title="logout" />
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});
  
const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        logout,
        clear,
    }, dispatch)
);

export default connect(mapDispatchToProps)(SettingsScreen);
