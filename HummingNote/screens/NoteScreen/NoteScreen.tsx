import React, { useState } from 'react';
import {Alert, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TextInput} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';
import {updateNoteText, toggleNotePin, setNoteColor} from '../../components/Server/updateNote';
import {update} from '../../reducers/NoteReducer';

//importing styles
import Styles from '../../constants/Styles';

//importing Constants
import Colors from '../../constants/Colors';

const NoteScreen = (props: any) => {
    const {index, _id} = props.route.params;
    const note = props.note.notes[index];

    const [title, setTitle] = useState<string>(note.title);
    const [data, setData] = useState<string>(note.data);
    const [pinned, setPinned] = useState<boolean>(note.ispinned);
    const [color, setColor] = useState<string>(
        note.color ? 
        note.color : 
        Colors.dark.app[0]
    )

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newData, setNewData] = useState<string>(data);

    const onPressSave = async () => {
        Promise.all([
            setTitle(newTitle),
            setData(newData),
            setIsEditing(false),
        ])
        try {
            const updated = await updateNoteText(props.user.uid, {
                _id: _id,
                data: newData,
                title: newTitle
            })
            if (updated.status !== 1) {
                Alert.alert("Server Error:", updated.message);
            }
            props.SyncReduxAndServer(); // Syncs Redux with Server
        } catch (err) {
            console.log("Error on onPressSave:", err.message);
            Alert.alert("Application Error:", err.message);
        }
    }

    const onPressPin = async () => {
        const wasPinned = pinned;
        setPinned(!pinned);
        try {
            const updated = await toggleNotePin(props.user.uid, {
                _id: _id,
                ispinned: !wasPinned,
            })
            if (updated.status !== 1) {
                Alert.alert("Server Error:", updated.message);
            }
            props.SyncReduxAndServer()
        } catch (err) {
            setPinned(!pinned);
            console.log("Error on onPressSave:", err.message);
            Alert.alert("Application Error:", err.message);
        }
    }

    const onPressColorSet = async () => {
        const curColorIndex = Colors.dark.app.indexOf(color);
        const nextColorIndex = (curColorIndex + 1) % Colors.dark.app.length;
        const newColor = Colors.dark.app[nextColorIndex];
        setColor(newColor);
        try {
            const updated = await setNoteColor(props.user.uid, {
                _id: _id,
                color: newColor
            })
            if (updated.status !== 1) {
                Alert.alert("Server Error:", updated.message);
            }
            props.SyncReduxAndServer()
        } catch (err) {
            console.log("Error on onPressSave:", err.message);
            Alert.alert("Application Error:", err.message);
        }
    }

    if (isEditing) {
        return (
            <View style={Styles.mainContainer}>
                <Header
                    left={[
                        {
                            name: "Cross",
                            cusColor: color,
                            onPress: () => setIsEditing(false)
                        }
                    ]}
                    right={[
                        {
                            name: "Save",
                            cusColor: color,
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
                left={[
                    {
                        name: "Back",
                        cusColor: color,
                        onPress: () => props.navigation.goBack()
                    }
                ]}
                right={[
                    {
                        name: "Star",
                        isFilled: pinned,
                        cusColor: color,
                        onPress: () => onPressPin()
                    },{
                        name: "Drop",
                        isFilled: true,
                        cusColor: color,
                        onPress: () => onPressColorSet()
                    },{
                        name: "Edit",
                        cusColor: color,
                        onPress: () => setIsEditing(true)
                    }
                ]}
            />
            <View style={styles.noteContainer}>
                <Text style={[styles.noteTitle, {color}]}>{title}</Text>
                <Text style={[styles.noteBody, {color}]}>{data}</Text>
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
        marginTop: 12,
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
