import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const profileUser = () => {
    navigation.navigate("ProfileScreen")
  }
  useEffect(() => {
    const unsubsribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubsribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleAlign: "center",
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 65,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Icon name="arrow-left" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={profileUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            {/* <Avatar
              rounded
              source={{
                uri: "https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png",
              }}
            /> */}
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Icon name="group" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon name="search" size={23} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("ChatScreen", {
      id,
      chatName,
    });
  };

  return (
    <View style={styles.mainBody}>
      <StatusBar style="light" />
      <ScrollView style={{ height: '100%' }}>
        {chats.map(({ id, data: { chatName, directChatname } }) => {
          return (
            directChatname ? <CustomListItem
              key={id}
              id={id}
              chatName={directChatname.map((item) =>
                item != auth.currentUser.displayName ? item : ""
              )}
              enterChat={enterChat} />
              : <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
          )
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#202B35",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
