import { StyleSheet, Text, View ,TouchableOpacity, Image, SafeAreaView, Keyboard, TextInput} from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import Comment from '../components/post/Comment';
import { ScrollView } from 'react-native';
import { arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, updateDoc } from 'firebase/firestore';
import { db , auth } from '../firebase';
import { AntDesign , FontAwesome , Ionicons } from "@expo/vector-icons"

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
                source={{uri: 'https://img.icons8.com/fluency-systems-regular/48/back.png'}} 
                style={{ width: 20, height: 20, marginTop: 15 }}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>COMMENTS</Text>
        <Text></Text>
    </View>
)

const CommentScreen = ({ navigation , route }) => {
    const [ input , setInput ] = useState("");
  
    const addComment = () => {
      Keyboard.dismiss();
  
      const docRef = doc(db,'posts',route.params.id);
  
      updateDoc(docRef, {
          comments: arrayUnion(
              {
                  user: auth.currentUser.displayName,
                  comment: input,
                  profile_pic: auth.currentUser.photoURL,
              }
          ),
      });
      
      setInput("");
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header navigation={navigation}/>
      </View>
      <ScrollView contentContainerStyle= {{ paddingTop: 10 }}>
        {route.params.comments.map((data) => (
          <Comment id={route.params.id} user={data.user} comment={data.comment} profile_pic={data.profile_pic}/>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
            value={input}
            onChangeText={(text) =>setInput(text)}
            onSubmitEditing={addComment}
            placeholder='Comment' 
            style={styles.textInput}
        />
        <TouchableOpacity onPress={addComment} activeOpacity={0.5}>
            <Ionicons name="send" size={20} color="#2B68E6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    headerText: {
        color: '#36454F',
        fontWeight: '700',
        fontSize: 18,
        marginRight: 25,
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15, 
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
      },
})