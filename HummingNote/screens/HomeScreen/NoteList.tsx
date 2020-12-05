import React from 'react';
import {ActionSheetIOS, StyleSheet} from 'react-native';

import {View} from '../../components/Themed';
import Note from '../../components/Note/Note';

import layout from '../../constants/Layout';
const width = layout.window.width;

export interface NoteListProps {
    notes: any [],
    onPress: (index: number, _id: string) => void,
}

const NoteList = ({notes, onPress, onLongPress}: NoteListProps) => {
    return (
        <>
        <View style={styles.noteContainerSide}>
            <View style={styles.noteSideWrapper}>
                {
                    notes.filter((_: any, i: number) => i%2 === 0).map((item: any, index: number) => {
                        const {title, data, _id, color} = item;
                        return <Note
                            key={_id}
                            color={color}
                            title={title}
                            body={data}
                            onPress={() => onPress(notes.indexOf(item), _id)}
                        />
                    })
                }
            </View>
            <View style={styles.noteSideWrapper}>
                {
                    notes.filter((_: any, i: number) => i%2 !== 0).map((item: any, index: number) => {
                        const {title, data, _id, color} = item;
                        return <Note
                            key={_id}
                            color={color}
                            title={title}
                            body={data}
                            onPress={() => onPress(notes.indexOf(item), _id)}
                        />
                    })
                }
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    noteSideWrapper: {
        width: width / 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    noteContainerSide: {
      display: "flex",
      flexDirection: "row",
    },
  });

export default NoteList;
