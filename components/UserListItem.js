import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase'

const UserListItem = ({ id, displayName, imageUrl, enterChat }) => {
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
        <ListItem containerStyle={{ backgroundColor: "#202B35" }} onPress={() => enterChat(id, displayName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: imageUrl
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800", color: "white" }}>
                    {displayName}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default UserListItem
