import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerTitleAlign: "center",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {

  }

  return (
    <View style={styles.mainBody}>
      <View style={styles.SectionStyle}>
        <Icon name="wechat" type="antdesign" size={24} color="white" />
        <TextInput
          style={styles.inputStyle}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter a chat name"
          placeholderTextColor="#8b9cb5"
          autoFocus
        />
      </View>

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}
      onPress={createChat}>
        <Text style={styles.buttonTextStyle}>Create new chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChatScreen;

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
