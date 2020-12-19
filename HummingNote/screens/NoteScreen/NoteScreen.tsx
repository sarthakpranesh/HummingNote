import React, { useState } from 'react';
import {Alert, StyleSheet, ScrollView, Vibration} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TextInput, SafeAreaView} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';
import {updateNoteText, toggleNotePin, setNoteColor} from '../../components/Server/updateNote';
import deleteNote from '../../components/Server/deleteNote';
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

    const onPressDelete = async () => {
        const sync = () => props.SyncReduxAndServer();
        const back = () => props.navigation.goBack();
        Vibration.vibrate(50, false)
        Alert.alert(
            "Delete",
            "Once deleted then the note content cannot be recovered. Please make sure you don't have anything valuable saved. Proceed to delete?",
            [
                {text: "Delete", onPress: async () => {
                    try {
                        const didDelete = await deleteNote(props.user.uid, _id)
                        if (didDelete.status !== 1) {
                            console.log("Error in onPressDelete:", didDelete.message);
                            Alert.alert("Application Error", didDelete.message)
                        } else {
                            await back();
                            sync();
                        }
                    } catch (err) {
                        console.log("Error in onPressDelete:", err.message);
                        Alert.alert("Application Error", err.message)
                    }
                }},
                {text: "cancel"}
            ],
            {
                cancelable: true,
            }
        )
    }

    if (isEditing) {
        return (
            <SafeAreaView>
            <View style={Styles.mainContainer}>
                <Header
                    left={[
                        {
                            name: "Cross",
                            cusColor: color,
                            onPress: () => Promise.all([
                                setNewTitle(title),
                                setNewData(data),
                                setIsEditing(false),
                            ])
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
                <ScrollView
                    alwaysBounceVertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 12}}
                >
                    <View style={styles.noteContainer}>
                        <TextInput
                            style={[styles.noteTitle, {color}]}
                            value={newTitle}
                            onChangeText={(t) => setNewTitle(t)}
                        />
                        <TextInput
                            style={[styles.noteBody, {
                                color,
                                marginBottom: 0,
                                paddingBottom: 20,
                            }]}
                            value={newData}
                            onChangeText={(b) => setNewData(b)}
                            multiline={true}
                        />
                    </View>
                </ScrollView>
            </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
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
                    },{
                        name: "Delete",
                        cusColor: color,
                        onPress: () => onPressDelete()
                    }
                ]}
            />
            <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                style={{marginTop: 12}}
            >
                <View style={styles.noteContainer}>
                    <Text style={[styles.noteTitle, {color}]}>{title}</Text>
                    <Text style={[styles.noteBody, {color}]}>{data}</Text>
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
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
        textAlign: 'left',
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
