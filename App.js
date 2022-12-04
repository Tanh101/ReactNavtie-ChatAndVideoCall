import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddChatScreen from "./Screens/AddChatScreen";
import CallScreen from "./Screens/CallScreen";
import ChatScreen from "./Screens/ChatScreen";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#06DE8B" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home" 
        screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
