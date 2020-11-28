import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';

//importing styles
import Styles from '../../constants/Styles';
import { SharedElement } from 'react-navigation-shared-element';

const NoteScreen = (props: any) => {
    const {title , body, id} = props.route.params;

    return (
        <View style={Styles.mainContainer}>
            <Header
                left={[{name: "arrow-left", onPress: () => props.navigation.goBack()}]}
                right={[
                    {
                        name: "flag",
                        onPress: () => console.log("0")
                    },{
                        name: "bell",
                        onPress: () => console.log("1")
                    },{
                        name: "archive",
                        onPress: () => console.log("2")
                    }
                ]}
            />
            <View style={styles.noteContainer}>
                <SharedElement id={`item.${id}.title`}>
                    <Text style={styles.noteTitle}>{title}</Text>
                </SharedElement>
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
        margin: 20,
        paddingBottom: 0,
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
    },
    noteBody: {
        marginTop: 60,
        margin: 20,
        fontSize: 18,
        textAlign: 'justify',
    }
})

export default NoteScreen;
