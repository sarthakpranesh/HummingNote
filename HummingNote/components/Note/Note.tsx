import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View, Text} from '../Themed';

//importing constants
import Layout from '../../constants/Layout';
import { SharedElement } from 'react-navigation-shared-element';

interface NoteProps {
    index: number;
    title: string;
    body: string;
    onPress: () => void;
}

const Note = ({index, title, body, onPress}: NoteProps) => {

    return (
        <View style={styles.noteContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.noteBox}>
                    <SharedElement id={`item.${index}.title`}>
                        <Text style={styles.title}>{title}</Text>
                    </SharedElement>
                    <Text style={styles.body}>{body}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    noteContainer: {
        width: (Layout.window.width / 2) - 6,
        maxHeight: Layout.window.height*0.3,
    },
    noteBox: {
        borderColor: 'rgba(255, 255, 255, 0.6)',
        maxHeight: Layout.window.height*0.3 - 10,
        borderWidth: 2,
        borderRadius: 8,
        padding: 14,
        margin: 7,
        overflow: 'hidden',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
    },
    body: {
        marginTop: 24,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'justify',
    }
});

export default Note;
