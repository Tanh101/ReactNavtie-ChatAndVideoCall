import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Image, StatusBar } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(( )=> {
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    })
    return unsubcribe;
  }, [])

  

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={styles.mainBody}>
      <StatusBar styles="light" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://logodix.com/logo/87913.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Email"
          placeholderTextColor="#8b9cb5"
          autoFocus
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

      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}
        onPress={handleLogin}>
        <Text style={styles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerTextStyle}
        onPress={()=> navigation.navigate('Register')}
      >
        New here ? Register
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#202B35",
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    margin: 30,
    marginBottom: 100,
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
    borderBottomColor: "#06DE8B"
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
  registerTextStyle: {
    color: '#06DE8B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    padding: 10,
  },
});
