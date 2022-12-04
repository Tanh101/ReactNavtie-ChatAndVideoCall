import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import bg from '../assets/ios_bg.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute, useNavigation} from '@react-navigation/native';
// import {Voximplant} from 'react-native-voximplant';

const IncomingCallScreen = () => {
  // const [caller, setCaller] = useState('');
  // const route = useRoute();
  const navigation = useNavigation();
  // const {call} = route.params;

  // useEffect(() => {
  //   setCaller('VanTanhLy');

  //   call.on(Voximplant.callEvent.Disconnected, callEvent => {
  //     navigation.navigate('ChatScreen');
  //   });

  //   return () => {
  //     call.off(Voximplant.CallEvents.Disconnected);
  //   };
  // }, []);

  // const onDecline = () => {
  //   call.decline();
  //   // console.warn('on Decline');
  // };

  // const onAccept = () => {
  //   navigation.navigate('Calling', {
  //     call,
  //     isIncomingCall: true,
  //   });
  //   console.warn('on Accept');
  // };

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>VanTanhLy</Text>
      {/* {caller} */}
      <Text style={styles.phoneNumber}>WhatsApp video...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button onPress={onDecline}*/}
        <Pressable style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button onPress={onDecline} */}
        <Pressable style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  bg: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});

export default IncomingCallScreen;
