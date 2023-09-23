import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { db , auth } from "../../firebase"
import { doc, updateDoc , arrayUnion, collection, arrayRemove} from "firebase/firestore";

const postFooterIcons = [
    {
      name: 'Like',
      imageUrl: "https://img.icons8.com/fluency-systems-regular/48/hearts.png",
      likedImageUrl: "https://img.icons8.com/windows/32/000000/filled-heart.png"
    },
    {
      name: 'Comment',
      imageUrl: "https://img.icons8.com/fluency-systems-regular/48/speech-bubble--v1.png"
    },
]

const Likes = ({ likes_by_users }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      <Text style={{ color: '#36454F' ,fontWeight: '600'}}>{likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
)

const Caption = ({ caption , username }) => (
    <View style={{ flexDirection: 'row', marginTop: 3 }}>
      <Text>
        <Text style={{ color: '#36454F', fontWeight: '600' }} >{username}</Text>
        <Text> {caption}</Text>
      </Text>
    </View>
)
  
const CommentSection = ({ comments }) => (
<View style={{ marginTop: 3 }}>
    {!!comments.length && (<Text style={{ color: 'grey' }} >
    View{comments.length > 1 ? ' all' : ''} {comments.length}{' '}
    {comments.length > 1 ? 'comments': 'comment'}
    </Text>)}
</View>
)

const Comments = ({comments}) => (
<>
    {comments.map((comment,index) => (
    <View key={index} style={{flexDirection: 'row' ,marginTop: 3}}>
        <Text>
        <Text style={{ color: '#36454F',fontWeight: '600'}}>{comment.user} </Text>
        {comment.comment}
        </Text>
    </View>
    ))}
</>

)

const PostFooter = ({ navigation, handleLike , likes_by_users }) => (
<View style={{ flexDirection: 'row'}}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() =>handleLike(likes_by_users)}>
        <Image
          style={styles.footerIcon}
          source={{ uri: likes_by_users.includes(auth.currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }}
        />
      </TouchableOpacity>
      <View>
          <TouchableOpacity onPress={() => navigation.push('CommentScreen')} >
          <Image 
              style={styles.footerIcon} 
              source={{ uri: "https://img.icons8.com/fluency-systems-regular/48/speech-bubble--v1.png"}} 
          />
          </TouchableOpacity>
      </View>
    </View>
</View>
)

const PostHeader = ({ profilePic, username }) => (
<View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
    <Image source={{ uri: profilePic}} style={styles.story} />
    <Text style={{ color: '#36454F', marginLeft: 8, fontWeight: '600'}}>
        {username}
    </Text>
    </View>
</View> 
)

const PostImage = ({ imageUrl }) => (
<View style={{ width: '100%', height: 350 }}>
    <Image 
    source={{ uri: imageUrl }} 
    style={{ height: '100%', resizeMode: 'cover'}}
    />
</View>
)

const Post = ({ id,navigation , username,profilePic,imageUrl,caption,timestamp,likes,user_uid,likes_by_users,comments}) => {
  const handleLike = (likes_by_users) => {
    const currentLikeStatus = !likes_by_users.includes(
      auth.currentUser.email
    )

    const docRef = doc(db,'posts',id)

    updateDoc(docRef, {
      likes_by_users: currentLikeStatus?
      arrayUnion(auth.currentUser.email):
      arrayRemove(auth.currentUser.email)
    })
    .then(()=> {
      console.log('Document successfully updated')
    })
    .catch(error=> {
      console.error('Error updating document: ', error)
    })

  }
  
  return (
    <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation='vertical'  />
      <PostHeader profilePic={profilePic} username={username}/>
      <PostImage imageUrl={imageUrl} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter navigation={navigation} handleLike={handleLike} likes_by_users={likes_by_users}/>
        <Likes likes_by_users={likes_by_users} />
        <Caption caption={caption} username={username}/>
        <CommentSection comments={comments} />
        <Comments comments={comments} />
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
      },
      footerIcon: {
        width: 25,
        height: 25,
      },
      leftFooterIconsContainer: {
        flexDirection: 'row',
        width: "17%",
        justifyContent: 'space-between'
      }
})