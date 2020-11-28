import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Button, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View} from '../../components/Themed';

// importing components
import Note from '../../components/Note/Note';
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider'
import fetchNotes from '../../components/Server/fetchNotes';
import {logout} from '../../reducers/UserReducer';
import {update} from '../../reducers/NoteReducer';

//importing Styles
import Styles from '../../constants/Styles';

//importing Constants
import layout from '../../constants/Layout';
const {width} = layout.window;

const HomeScreen = (props: any) => {

  useEffect(() => {
    fetchNotes(props.user.uid)
      .then((data) => {
        if (data.status === 1) {
          // console.log(data.notes)
          props.update(data.notes)
        } else {
          console.log("HomeScreen: Request Status not 1:", data);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      fetchNotes(props.user.uid)
      .then((data) => {
        if (data.status === 1) {
          // console.log(data.notes)
          props.update(data.notes)
        } else {
          console.log("HomeScreen: Request Status not 1:", data);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message)
      })
    }, 60 * 60 * 1);
  }, [])

  const notes = props.note.notes;
  console.log(notes.length)
  return (
    <View style={[Styles.mainContainer, {paddingBottom: 0, paddingHorizontal: 0}]}>
      <Header
        left={[{name: "Humming Note", isLabel: true, onPress: () => console.log("label")}]}
        right={[{name: "plus", onPress: () => console.log("Add mote")}]}
      />
      <Divider />
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
      >
        <View style={styles.noteContainerSide}>
          <View style={styles.noteSideWrapper}>
            {
              notes.filter((_: any, i: number) => i%2 === 0).map((item: any, index: number) => {
                const {title, data, _id} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {title, body: data, id: _id});
                }
                return <Note key={_id} id={_id} title={title} body={data} onPress={onPress} />
              })
            }
          </View>
          <View style={styles.noteSideWrapper}>
            {
              notes.filter((_: any, i: number) => i%2 !== 0).map((item: any, index: number) => {
                const {title, data, _id} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {title, body: data, id: _id});
                }
                return <Note key={_id} id={_id} title={title} body={data} onPress={onPress} />
              })
            }
          </View>
        </View>
      </ScrollView>
      {/* <Button onPress={() => props.logout()} title="logout" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  notesContainer: {
    paddingVertical: 10,
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
    update,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
