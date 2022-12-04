import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import SearchBar from "react-native-dynamic-search-bar"
import UserListItem from "../components/UserListItem";
import * as firebase from "firebase"


const SearchScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)


    const handleSearch = () => {
        const usersRef = db.collection('users');
        usersRef.where('displayName', '==', username).get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    setErr(true)
                    setUser(null)
                    return;
                }
                snapshot.forEach(user => {
                    setErr(false)
                    setUser(user.data())
                });
            })

    }

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTitle: "Search",
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        const combinedId =
            auth.currentUser.uid > user.uid
                ? auth.currentUser.uid + user.uid
                : user.uid + auth.currentUser.uid;

        db.collection('chats').doc(combinedId)
            .get().then(
                async doc => {
                    if (!doc.exists) {
                        // crate a chat in chats collection
                        db.collection("chats")
                            .doc(combinedId)
                            .set({ directChatname: [
                                auth.currentUser.displayName,
                                user.displayName
                            ]})
                        // crate user chats
                        const userChatsRef1 = db.collection('userChats').doc(auth.currentUser.uid);
                        const res1 = await userChatsRef1.update({
                            [combinedId + ".userInfo"]: {
                                uid: user.uid,
                                displayName: user.displayName,
                                imageUrl: user.imageUrl,
                            },
                            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        const userChatsRef2 = db.collection('userChats').doc(user.uid);
                        const res2 = await userChatsRef2.update({
                            [combinedId + ".userInfo"]: {
                                uid: auth.currentUser.uid,
                                displayName: auth.currentUser.displayName,
                                imageUrl: auth.currentUser.photoURL,
                            },
                            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    }
                });
        navigation.navigate('ChatScreen', {
            id,
            chatName,
        })
    }

    return (

        <View style={styles.mainBody}>
            <SearchBar
                style={{ marginTop: 20, marginBottom: 20 }}
                placeholder="Search here"
                onSubmitEditing={handleSearch}
                onChangeText={text => {
                    setUsername(text)
                }}
                onPressCancel={() => {
                    this.filterList("");
                }}
                onPress={handleSearch}
            />
            {err && (
                <Text style={{ color: "#A5ABB3", alignSelf: "center", margin: 20, }}>User not found!</Text>
            )}
            {user && (
                <UserListItem key={user.id} id={user.uid} displayName={user.displayName} imageUrl={user.imageUrl} enterChat={enterChat} />
            )}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignContent: "center",
        backgroundColor: "#202B35",
    },
    SectionStyle: {
        flexDirection: "row",
        height: 50,
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        padding: 11,
        borderWidth: 1,
        borderColor: "#06DE8B",
        borderRadius: 10,
    },
    inputStyle: {
        flex: 1,
        color: "white",
        paddingLeft: 15,
    },
    buttonStyle: {
        backgroundColor: "#06DE8B",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: "#FFFFFF",
        paddingVertical: 10,
        fontSize: 18,
    },
});
