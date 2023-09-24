import { StyleSheet , Text , View } from 'react-native'
import React, { useEffect , useState } from 'react'
import { db } from "../../firebase"
import { onSnapshot , collection, orderBy } from 'firebase/firestore'
import Post from '../post/Post'

const Posts = ({ navigation }) => {

  const [ posts , setPosts ] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db,'posts'), 
    orderBy('timestamp','desc'),
    snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    })

    return unsubscribe;
  },[])

  const enterComment = (id,comments) => [
    navigation.navigate("CommentScreen", {
      id: id,
      comments: comments,
    })
  ]

  return (
    <View>
      { posts.map(({id, data: {username,profilePic,imageUrl,caption,timestamp,likes,user_uid,likes_by_users,comments}}) => (
          <Post 
            key={id} 
            id={id}
            navigation={navigation}
            username={username} 
            profilePic={profilePic}
            imageUrl={imageUrl}
            caption={caption}
            timestamp={timestamp}
            likes={likes}
            user_uid={user_uid}
            likes_by_users={likes_by_users}
            comments={comments}
            enterComment={enterComment}
          />
       ))} 
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({})