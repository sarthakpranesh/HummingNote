import React, {useState} from 'react';
import {ScrollView, StyleSheet, Vibration, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {View, Text, SafeAreaView} from '../../components/Themed';

// importing components
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider';
import {logout} from '../../reducers/UserReducer';
import {clear} from '../../reducers/NoteReducer';

//importing Styles
import Styles from '../../constants/Styles';

//importing Constants
import layout from '../../constants/Layout';
const {width} = layout.window;

import NoteList from './NoteList';

const HomeScreen = (props: any) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false);

  const activateDelete = () => {
    Promise.all([
      setIsDeleteActive(true),
      Vibration.vibrate(100, false),
    ])
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await props.SyncReduxAndServer();
    setRefreshing(false);
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
      left: [{name: "Humming Note", isLabel: true, onPress: () => props.navigation.openDrawer()}],
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    marginLeft: 20,
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
