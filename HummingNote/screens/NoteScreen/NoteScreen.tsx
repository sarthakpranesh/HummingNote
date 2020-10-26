import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';

//importing styles
import Styles from '../../constants/Styles';

const NoteScreen = (props: any) => {
    const {title , body} = props.route.params;

    return (
        <View style={Styles.mainContainer}>
            <Header goBack={() => props.navigation.goBack()} />
            <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>{title}</Text>
                <Text style={styles.noteBody}>{body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    noteContainer: {
        marginTop: 20,
    },
    noteTitle: {
        padding: 20,
        paddingBottom: 0,
        fontSize: 24,
    },
    noteBody: {
        padding: 20,
        fontSize: 18,
        textAlign: 'justify',
    }
})

export default NoteScreen;
