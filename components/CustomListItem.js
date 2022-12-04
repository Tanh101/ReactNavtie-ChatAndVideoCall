import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem containerStyle={{backgroundColor:"#202B35"}}
        key={id} bottomDivider>
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
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ color: "#61637C"}}>
                    This is a test Subtitle
                    This is a test Subtitle
                    This is a test Subtitle
                    This is a test Subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem
