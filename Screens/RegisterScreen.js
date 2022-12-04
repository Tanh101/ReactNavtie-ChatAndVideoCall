import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const user = authUser.user;
        console.log('Registered with: ', user.email);
        user.updateProfile({
          displayName: displayName,
          photoURL:
          imageUrl ? imageUrl : 'https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png'

        });
        db.collection("users")
          .doc(user.uid)
          .set({
            uid: user.uid,
            displayName,
            email,
            imageUrl: imageUrl,
          })
        db.collection("userChats")
          .doc(user.uid)
          .set({})
      })
      .catch(error => alert(error.message))
  }

  return (
    <View behavior="padding" style={styles.mainBody}>
      <StatusBar style="light" />
      <ScrollView >
        <Text style={styles.title}>Create a signal account</Text>
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
            placeholder="Enter Email"
            placeholderTextColor="#8b9cb5"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Password"
            placeholderTextColor="#8b9cb5"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirm Password"
            placeholderTextColor="#8b9cb5"
            secureTextEntry
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
        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}
          onPress={register}>
          <Text style={styles.buttonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
        <Text
          style={styles.loginTextStyle}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account. Login now ?
        </Text>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    paddingTop: 10,
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
