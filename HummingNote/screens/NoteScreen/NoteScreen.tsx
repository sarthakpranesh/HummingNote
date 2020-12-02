import React, { useState } from 'react';
import {Alert, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TextInput} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';
import {updateNoteText} from '../../components/Server/updateNote';
import {update} from '../../reducers/NoteReducer';

//importing styles
import Styles from '../../constants/Styles';

const NoteScreen = (props: any) => {
    const {index, _id} = props.route.params;
    const [title, setTitle] = useState<string>(props.note.notes[index].title);
    const [data, setData] = useState<string>(props.note.notes[index].data);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newData, setNewData] = useState<string>(data);

    const onPressSave = async () => {
        try {
            const updated = await updateNoteText(props.user.uid, {
                _id: _id,
                data: newData.length === data.length ? null : newData,
                title: newTitle.length === title.length ? null : newTitle
            })
            if (updated.status !== 1) {
                Alert.alert("Server Error:", updated.message);
            }
            Promise.all([
                setTitle(newTitle),
                setData(newData),
                props.SyncReduxAndServer(), // Syncs Redux with Server
                setIsEditing(false),
            ])
        } catch (err) {
            console.log("Error on onPressSave:", err.message);
        }
    }

    if (isEditing) {
        return (
            <View style={Styles.mainContainer}>
                <Header
                    left={[{name: "x", onPress: () => setIsEditing(false)}]}
                    right={[
                        {
                            name: "save",
                            onPress: onPressSave,
                        }
                    ]}
                />
                <View style={styles.noteContainer}>
                    <TextInput
                        style={styles.noteTitle}
                        value={newTitle}
                        onChangeText={(t) => setNewTitle(t)}
                    />
                    <TextInput
                        style={styles.noteBody}
                        value={newData}
                        onChangeText={(b) => setNewData(b)}
                        multiline={true}
                    />
                </View>
            </View>
        )
    }

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
                        name: "edit",
                        onPress: () => setIsEditing(true)
                    }
                ]}
            />
            <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>{title}</Text>
                <Text style={styles.noteBody}>{data}</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    noteBody: {
        margin: 20,
        marginTop: 8,
        fontSize: 18,
        textAlign: 'justify',
    }
})

const mapStateToProps = (state: any) => {
    const {user} = state.userReducer;
    const {note} = state.noteReducer;
    return {user, note};
}
  
const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        update,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
