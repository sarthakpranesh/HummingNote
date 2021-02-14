import React from 'react';
import {ActionSheetIOS, StyleSheet} from 'react-native';

import {View} from '../../components/Themed';
import Note from '../../components/Note/Note';

import layout from '../../constants/Layout';
import Layout from '../../constants/Layout';
const width = layout.window.width;

export interface NoteListProps {
    notes: any [],
    onPress: (index: number, _id: string) => void,
}

const NoteList = ({notes, onPress}: NoteListProps) => {
    return (
        <View style={styles.noteContainerSide}>
            {
                notes.map((item: any, index: number) => {
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
    )
}

const styles = StyleSheet.create({
    noteContainerSide: {
        margin: Layout.isLargeDevice ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: Layout.isLargeDevice ? 300*3 : width,
    },
  });

export default NoteList;
