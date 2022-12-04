import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setChatMessages(snapshot.docs.map(doc => doc.data()))
            )

        return unsubscribe
    })

    return (
        <ListItem containerStyle={{ backgroundColor: "#202B35" }} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                        'https://codefly.vn/wp-content/uploads/code/2020/12/11934/projecthtml/Source%20Code/uploadImage/Profile/blank_avatar.png',
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800", color: "white" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ color: "#61637C" }}>
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem
