import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View} from '../../components/Themed';

// importing components
import Note from '../../components/Note/Note';
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider'
import {logout} from '../../reducers/UserReducer';

//importing Styles
import Styles from '../../constants/Styles';

// temp constants
const notes = [
  {
    title: "Title 1",
    body: "This is the body of the note get that!",
  },{
    title: "Title 2",
    body: "This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! ",
  },{
    title: "Title 3",
    body: "This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! ",
  },{
    title: "Title 1",
    body: "This is the body of the note get that!",
  },{
    title: "Title 2",
    body: "This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! ",
  },{
    title: "Title 3",
    body: "This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! This is the body of the note get that! ",
  }
]

const HomeScreen = (props: any) => {
  return (
    <View style={[Styles.mainContainer]}>
      <Header
        left={[{name: "Humming Note", isLabel: true, onPress: () => console.log("label")}]}
        right={[{name: "plus", onPress: () => console.log("Add mote")}]}
      />
      <Divider />
      <FlatList
        style={{paddingTop: 10}}
        showsVerticalScrollIndicator={false}
        data={notes}
        numColumns={2}
        keyExtractor={({}, index) => `@${index}`}
        ItemSeparatorComponent={() => null}
        renderItem={({item, index}) => {
          const {title, body} = item;
          const onPress = () => {
            props.navigation.navigate("Note", {title, body, index});
          }
          return <Note index={index} title={title} body={body} onPress={onPress} />
        }}
      />
      {/* <Button onPress={() => props.logout()} title="logout" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
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
