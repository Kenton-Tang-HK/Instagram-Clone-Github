import { StyleSheet, Text, View ,TouchableOpacity, Image, SafeAreaView, Keyboard} from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import { doc, updateDoc , arrayUnion, onSnapshot,getDoc, collection, orderBy } from "firebase/firestore";
import { db , auth } from '../../firebase';
import { ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

const PLACEHOLDER_IMG = 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'

const Comment = ({ id , user , comment , profile_pic }) => {

  return (
    <ListItem key={id}>
        <Avatar 
            rounded
            source={{
                uri: profile_pic
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "800" }}> 
                {user}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {comment}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default Comment

const styles = StyleSheet.create({})