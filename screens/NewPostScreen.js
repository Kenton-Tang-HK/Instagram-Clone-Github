import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { auth , db } from "../firebase"
import { collection, addDoc , serverTimestamp } from "firebase/firestore"

const PLACEHOLDER_IMG = 'https://www.cumbriaeducationtrust.org/wp-content/uploads/2016/01/placeholder.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200,'Caption has reached the character limit.')
})

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
                source={{uri: 'https://img.icons8.com/fluency-systems-regular/48/back.png'}} 
                style={{ width: 20, height: 20, marginTop: 15 }}
            />
        </TouchableOpacity>
      <Text style={styles.headerText}>NEW POST</Text>
      <Text></Text>
    </View>
)

const NewPostScreen = ({ navigation }) => {
  const [ thumbnailUrl , setThumbnailUrl ] = useState(PLACEHOLDER_IMG)

  const uploadPostToFirebase = async (imageUrl,caption) => {
    await addDoc(collection(db,'posts'), {
        username: auth?.currentUser?.displayName,
        profilePic: auth?.currentUser?.photoURL,
        imageUrl: imageUrl,
        caption: caption,
        timestamp: serverTimestamp(),
        likes: 0,
        user_uid: auth?.currentUser?.uid,
        likes_by_users: [],
        comments: [],
    }) 
    .then(()=> {
        navigation.goBack();
      }).catch((error)=>alert(error))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header navigation={navigation}/>
        
        <Formik 
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl,values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            >
            {({ handleBlur , handleChange , handleSubmit , values , errors , isValid }) => (
                <>
                <View
                    style={{
                    margin: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                    }}
                >
                    <Image 
                        source={{ uri: validUrl.isUri(thumbnailUrl)? thumbnailUrl : PLACEHOLDER_IMG }}
                        style={{ width: 100, height: 100 }}
                    />

                    <View style={{ flex: 1, marginLeft: 12 }}>
                    <TextInput 
                        style={{ fontSize: 16 }}
                        placeholder='Write a caption...'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                    </View>
                </View>

                <Divider width={0.3} orientation='vertical' />

                <View style={{ marginTop: 5 }}>
                    <TextInput 
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    style={{ fontSize: 16 }}
                    placeholder='Enter Image URL'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleBlur('imageUrl')}
                    value={values.imageUrl}

                    />
                </View>
                    {errors.imageUrl && (
                    <Text style={{ fontSize: 10, color: 'red', marginTop: 3 }}>
                        {errors.imageUrl}
                    </Text>
                    )}

                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                </>
            )}
            </Formik>
        
    </View>
    </SafeAreaView>
  )
}

export default NewPostScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#36454F',
        fontWeight: '700',
        fontSize: 18,
        marginRight: 25,
        marginTop: 10,
    },
})