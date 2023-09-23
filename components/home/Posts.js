import { StyleSheet , Text , View } from 'react-native'
import React, { useEffect , useState } from 'react'
import { auth , db } from "../../firebase"
import { onSnapshot , collection } from 'firebase/firestore'
import Post from '../post/Post'

const Posts = ({ navigation }) => {

  const [ posts , setPosts ] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db,'posts'), snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    })

    return unsubscribe;
  },[])

  return (
    <View>
      { posts.map(({id, data: {username,profilePic,imageUrl,caption,timestamp,likes,user_uid,likes_by_users,comments}}) => (
          <Post 
            key={id} 
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
          />
       ))} 
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({})