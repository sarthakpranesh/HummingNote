import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, StyleSheet, Vibration, RefreshControl} from 'react-native';
import Animated, { interpolate, useAnimatedProps, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

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
  const progress = useSharedValue(0);


  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await props.SyncReduxAndServer();
    setRefreshing(false);
  }

  const notes = props.note.notes;
  const pinnedNotes = notes.filter((note: any) => note.ispinned)

  const homeScreenHeaderProps = () => {
    return {
      left: [{name: "Humming Note", isLabel: true, onPress: () => props.navigation.openDrawer()}],
      right: [{name: "Plus", onPress: () => props.navigation.navigate("AddNote")}],
    }
  }

  useEffect(() => {
    progress.value = withSequence(
      withTiming(1, {duration: 500,}),
      withTiming(2, {duration: 500,}),
      withTiming(3, {duration: 500,}),
    )
  }, []);

  const headerProps = homeScreenHeaderProps();

  const headerAnimatedProps = useAnimatedProps(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [-20, 0],
            Animated.Extrapolate.CLAMP,
          )
        },
      ],
    }
  });

  const pinnedAnimatedProps = useAnimatedProps(() => {
    return {
      opacity: progress.value - 1,
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [1, 2],
            [20, 0],
            Animated.Extrapolate.CLAMP,
          )
        },
      ],
    }
  });

  const allAnimatedProps = useAnimatedProps(() => {
    return {
      opacity: progress.value - 2,
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [2, 3],
            [20, 0],
            Animated.Extrapolate.CLAMP,
          )
        },
      ],
    }
  });

  return (
    <SafeAreaView>
    <View style={[Styles.mainContainer, {paddingBottom: 0, paddingHorizontal: 0}]}>
      <Animated.View style={headerAnimatedProps}>
        <Header
          left={headerProps.left}
          right={headerProps.right}
        />
      </Animated.View>
      <Divider />
      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View style={pinnedAnimatedProps}>
          <Text style={styles.noteContainerHeader}>Pinned</Text>
          <NoteList
            notes={pinnedNotes}
            onPress={(_, _id) => props.navigation.navigate("Note", {
              index: notes.findIndex((note: any) => note._id === _id),
              _id
            })}
          />
        </Animated.View>
        <Animated.View style={allAnimatedProps}>
          <Text style={styles.noteContainerHeader}>All</Text>
          <NoteList
            notes={notes}
            onPress={(index, _id) => props.navigation.navigate("Note", {index, _id})}
          />
        </Animated.View>
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
