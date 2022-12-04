import { StatusBar } from "expo-status-bar";
import { InteractionManager, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddChatScreen from "./Screens/AddChatScreen";
import CallScreen from "./Screens/CallScreen";
import ChatScreen from "./Screens/ChatScreen";
import IncomingCallScreen from "./Screens/InComingCallScreen";
import CallingScreen from "./Screens/CallingScreen";

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
        <Stack.Screen name="InComingCall" component={IncomingCallScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
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
