import React from 'react';
import {ScrollView, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text} from '../../components/Themed';

// importing components
import Note from '../../components/Note/Note';
import Header from '../../components/Header/Header';
import Divider from '../../components/Divider/Divider'
import {logout} from '../../reducers/UserReducer';

//importing Styles
import Styles from '../../constants/Styles';

//importing Constants
import layout from '../../constants/Layout';
const {width} = layout.window;

const HomeScreen = (props: any) => {

  const notes = props.note.notes;

  const pinnedNotes = notes.filter((note: any) => note.ispinned)

  return (
    <View style={[Styles.mainContainer, {paddingBottom: 0, paddingHorizontal: 0}]}>
      <Header
        left={[{name: "Humming Note", isLabel: true, onPress: () => console.log("label")}]}
        right={[{name: "Plus", onPress: () => console.log("Add mote")}]}
      />
      <Divider />
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
      >
        <Text style={styles.noteContainerHeader}>Pinned</Text>
        <View style={styles.noteContainerSide}>
          <View style={styles.noteSideWrapper}>
            {
              pinnedNotes.filter((_: any, i: number) => i%2 === 0).map((item: any, index: number) => {
                const {title, data, _id, color} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {index: notes.indexOf(item), _id: _id});
                }
                return <Note key={_id} title={title} color={color} body={data} onPress={onPress} />
              })
            }
          </View>
          <View style={styles.noteSideWrapper}>
            {
              pinnedNotes.filter((_: any, i: number) => i%2 !== 0).map((item: any, index: number) => {
                const {title, data, _id, color} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {index: notes.indexOf(item), _id: _id});
                }
                return <Note key={_id} color={color} title={title} body={data} onPress={onPress} />
              })
            }
          </View>
        </View>
        <Text style={styles.noteContainerHeader}>All</Text>
        <View style={styles.noteContainerSide}>
          <View style={styles.noteSideWrapper}>
            {
              notes.filter((_: any, i: number) => i%2 === 0).map((item: any, index: number) => {
                const {title, data, _id, color} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {index: notes.indexOf(item), _id: _id});
                }
                return <Note key={_id} color={color} title={title} body={data} onPress={onPress} />
              })
            }
          </View>
          <View style={styles.noteSideWrapper}>
            {
              notes.filter((_: any, i: number) => i%2 !== 0).map((item: any, index: number) => {
                const {title, data, _id, color} = item;
                const onPress = () => {
                  props.navigation.navigate("Note", {index: notes.indexOf(item), _id: _id});
                }
                return <Note key={_id} color={color} title={title} body={data} onPress={onPress} />
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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
