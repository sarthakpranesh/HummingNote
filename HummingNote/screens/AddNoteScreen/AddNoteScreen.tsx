import React, { useState } from 'react';
import {StyleSheet, ScrollView, Vibration, Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, TextInput, SafeAreaView} from '../../components/Themed';

//importing components
import Header from '../../components/Header/Header';
import addNote from '../../components/Server/addNote';
import {update} from '../../reducers/NoteReducer';

// importing constants
import Layout from '../../constants/Layout';

//importing styles
import Styles from '../../constants/Styles';

const AddNoteScreen = (props: any) => {

    const [title, setTitle] = useState<string>("");
    const [data, setData] = useState<string>("");

    const onPressCancel = () => {
        Vibration.vibrate(50);
        if (Platform.OS === "web") {
            return props.navigation.goBack()
        }
        Alert.alert(
            "Discard?",
            "All data written in this note will be discarded! Proceed?",
            [
                {text: "Yes", onPress: () => props.navigation.goBack()},
                {text: "No"}
            ],
            {
                cancelable: true,
            }
        )
    }

    const onPressAdd = async () => {
        try {
            const added = await addNote(props.user.uid, {
                title,
                data,
            })
            if (added.status !== 1) {
                Alert.alert("Server Error:", added.message);
            } else {
                props.navigation.goBack();
                props.SyncReduxAndServer(); // Syncs Redux with Server
            }
        } catch (err) {
            console.log("Error on onPressSave:", err.message);
            Alert.alert("Application Error:", err.message);
        }
    }

    return (
        <SafeAreaView>
            <Header
                left={[
                    {
                        name: "Cross",
                        onPress: onPressCancel,
                    }
                ]}
                right={[
                    {
                        name: "Save",
                        onPress: onPressAdd,
                    }
                ]}
                {...props}
            />
            <View style={Styles.mainContainer}>
                <ScrollView
                    alwaysBounceVertical={true}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 12}}
                >
                    <View style={styles.noteContainer}>
                        <TextInput
                            style={[styles.noteTitle]}
                            value={title}
                            placeholder="Title"
                            onChangeText={(t) => setTitle(t)}
                        />
                        <TextInput
                            style={[styles.noteBody, {
                                marginBottom: 0,
                                paddingBottom: 20,
                            }]}
                            value={data}
                            placeholder="Note"
                            autoFocus={true}
                            onChangeText={(b) => setData(b)}
                            multiline={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noteContainer: {
        marginTop: Layout.isLargeDevice ? 20 : 0,
    },
    noteTitle: {
        margin: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%'
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
    return {user};
}
  
const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        update,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteScreen);
