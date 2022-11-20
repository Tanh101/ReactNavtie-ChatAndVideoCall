import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View >
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            {/* <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} /> */}
            <Avatar
              rounded
              source={{
                uri:
                  'https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 65,
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="camera" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="pencil" size={23} color="white" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])


  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView>
        <CustomListItem />
        <CustomListItem />
        <CustomListItem />
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#202B35",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  }
})