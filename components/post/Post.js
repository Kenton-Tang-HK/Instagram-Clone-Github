import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const postFooterIcons = [
    {
      name: 'Like',
      imageUrl: "https://img.icons8.com/fluency-systems-regular/48/hearts.png",
      likedImageUrl: "https://img.icons8.com/fluency-systems-regular/48/F25081/like--v1.png"
    },
    {
      name: 'Comment',
      imageUrl: "https://img.icons8.com/fluency-systems-regular/48/speech-bubble--v1.png"
    },
]

const Icon = ({ imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl}} />
    </TouchableOpacity>
) 

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

const PostFooter = ({ navigation }) => (
<View style={{ flexDirection: 'row'}}>
    <View style={styles.leftFooterIconsContainer}>
    <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
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

const Post = ({ navigation , username,profilePic,imageUrl,caption,timestamp,likes,user_uid,likes_by_users,comments}) => 
   (
    <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation='vertical'  />
      <PostHeader profilePic={profilePic} username={username}/>
      <PostImage imageUrl={imageUrl} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter navigation={navigation}/>
        <Likes likes_by_users={likes_by_users} />
        <Caption caption={caption} username={username}/>
        <CommentSection comments={comments} />
        <Comments comments={comments} />
      </View>
    </View>
  )


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