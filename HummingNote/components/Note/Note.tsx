import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View, Text} from '../Themed';

//importing constants
import Layout from '../../constants/Layout';

interface NoteProps {
    color: string;
    title: string;
    body: string;
    onPress: () => void;
}

const Note = ({color, title, body, onPress}: NoteProps) => {

    return (
        <View style={styles.noteContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.noteBox}>
                    {/* Adding key equal to color to force the view (dot) to re-render (helps make sure view doesn't have square shape) */}
                    <View key={color} style={[styles.colorMarker, {backgroundColor: color}]} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.body}>{body}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    noteContainer: {
        width: Layout.isLargeDevice ? 300 : (Layout.window.width / 2),
        maxHeight: Layout.isLargeDevice ? 600 : Layout.window.height*0.3,
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
    colorMarker: {
        height: 8,
        width: 8,
        right: 6,
        top: 6,
        borderRadius: 4,
        position: 'absolute',
    },
    title: {
        fontSize: Layout.isLargeDevice ? 24 : 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    body: {
        marginTop: 12,
        fontSize: Layout.isLargeDevice ? 18 : 12,
        fontWeight: '600',
        textAlign: 'justify',
    }
});

export default Note;
