import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { useHeaderHeight } from '@react-navigation/elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as firebase from "firebase"
import { auth, db } from '../firebase';

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBacktitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri:
                                'https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png',
                        }} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 70,
                        marginRight: 10
                    }}
                >
                    <TouchableOpacity>
                        <Icon name="videocam" size={26} color="white"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="call" size={22} color="white"></Icon>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) => (
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            ))

        return unsubscribe
    }, [route])

    const height = useHeaderHeight()

    return (
        <View style={{ flex: 1, backgroundColor: "#202B35" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={height + 60}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        {/* <Avatar
                                            position="absolute"
                                            rounded
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -10,
                                                left: -5,
                                            }}
                                            size={20}
                                            bottom={-10}
                                            left={-5}
                                            source={{
                                                // uri: data.photoURL,
                                                uri: 'https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png',
                                            }}
                                        /> */}
                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={text => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder='Send Message'
                                style={styles.textInput}
                                placeholderTextColor="#A5ABB3"
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Icon name="send" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#06DE8B",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 10,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#283642",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 10,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginRight: 10,
        marginBottom: 15,
    },
    receiverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#283642",
        padding: 10,
        paddingHorizontal: 15,
        color: "#A5ABB3",
        borderRadius: 30,
    }
})