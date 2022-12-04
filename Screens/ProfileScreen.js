import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setDisplayName(auth?.currentUser?.displayName);
    setImageUrl(auth?.currentUser?.photoURL);
  }, []);

  const updateProfile = () => {
    const user = auth.currentUser;
    user.updateProfile({
      displayName: displayName,
      photoURL: imageUrl,
    }).then (()=>{
        alert("UPDATE SUCCESS!")
    }).then(() => {
        navigation.navigate("Home")
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.mainBody}>
      <StatusBar style="light" />
      <ScrollView>
        <Text style={styles.title}>USER</Text>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Display Name"
            placeholderTextColor="#8b9cb5"
            autoFocus
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Profile Picture URL (optional)"
            placeholderTextColor="#8b9cb5"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={updateProfile}
        >
          <Text style={styles.buttonTextStyle}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#202B35",
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: "#06DE8B",
    borderBottomColor: "#06DE8B",
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
    marginTop: 30,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  loginTextStyle: {
    color: "#06DE8B",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
    padding: 10,
  },
});
