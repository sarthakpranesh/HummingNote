import React, {useState} from 'react';
import {ScrollView, StyleSheet, Vibration, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {View, Text, SafeAreaView} from '../../components/Themed';

// importing components
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider'
import {logout} from '../../reducers/UserReducer';
import {clear} from '../../reducers/NoteReducer';

//importing Styles
import Styles from '../../constants/Styles';

//importing Constants
import layout from '../../constants/Layout';
const {width} = layout.window;

import NoteList from './NoteList';

const HomeScreen = (props: any) => {
  const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false);

  const activateDelete = () => {
    Promise.all([
      setIsDeleteActive(true),
      Vibration.vibrate(100, false),
    ])
  }

  const notes = props.note.notes;
  const pinnedNotes = notes.filter((note: any) => note.ispinned)

  const homeScreenHeaderProps = (isDeleteActive: boolean) => {
    if (isDeleteActive) {
      return {
        left: [{name: "Cross", onPress: () => console.log("Cancel")}],
        right: [{name: "Plus", onPress: () => console.log("Delete")}],
      }
    }

    return {
      left: [{name: "Humming Note", isLabel: true, onPress: () => console.log("label")}],
      right: [{name: "Plus", onPress: () => props.navigation.navigate("AddNote")}],
    }
  }

  const headerProps = homeScreenHeaderProps(isDeleteActive);

  return (
    <SafeAreaView>
    <View style={[Styles.mainContainer, {paddingBottom: 0, paddingHorizontal: 0}]}>
      <Header
        left={headerProps.left}
        right={headerProps.right}
      />
      <Divider />
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
      >
        <Text style={styles.noteContainerHeader}>Pinned</Text>
        <NoteList
          notes={pinnedNotes}
          onPress={(_, _id) => props.navigation.navigate("Note", {
            index: notes.findIndex((note: any) => note._id === _id),
            _id
          })}
        />
        <Text style={styles.noteContainerHeader}>All</Text>
        <NoteList
          notes={notes}
          onPress={(index, _id) => props.navigation.navigate("Note", {index, _id})}
        />
      </ScrollView>
      <Button onPress={() => Promise.all([props.logout(), props.clear()])} title="logout" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  notesContainer: {
    paddingBottom: 10,
  },
  noteContainerHeader: {
    marginLeft: 12,
    marginTop: 20,
  },
  noteContainerSide: {
    display: "flex",
    flexDirection: "row",
  },
  noteSideWrapper: {
    width: width / 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  }
});

const mapStateToProps = (state: any) => {
  const {user} = state.userReducer;
  const {note} = state.noteReducer;
  return {user, note};
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    logout,
    clear,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
