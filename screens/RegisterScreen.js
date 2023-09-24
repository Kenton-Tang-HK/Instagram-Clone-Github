import { Pressable, Image, StyleSheet, Text, TextInput, TouchableOpacity, View , KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword , updateProfile } from  "firebase/auth"
import Validator from 'email-validator' 
import validUrl from 'valid-url'

const INSTAGRAM_LOGO_2 = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram-1.png'
const PLACEHOLDER_IMG = 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'

const RegisterScreen = ({ navigation }) => {
    const [ email , setEmail ] = useState("");    
    const [ username , setUsername ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ imageUrl , setImageUrl ] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then((authUser) => {
            const user = authUser.user;
            updateProfile(user, {
                displayName: username,
                email: email,
                photoURL: imageUrl || PLACEHOLDER_IMG
            })
        })
        .catch(error => alert(error.message));
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
            source={{ uri: INSTAGRAM_LOGO_2 }}
            style={{ height: 100, width: 200 }}
        />
      </View>

      <View style={styles.wrapper}>
        <>
            <>
                <View style={[styles.inputField,
                    { borderColor:
                        email.length<1 || Validator.validate(email) ? '#ccc' : '#FD1D1D'
                    }
                ]}>
                    <TextInput 
                        placeholderTextColor= '#444'
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        autoFocus={true}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>

                <View style={[styles.inputField,
                    { borderColor:
                        username.length<1 || username.length>=2 ? '#ccc' : '#FD1D1D'
                    }
                ]}>
                    <TextInput 
                        placeholderTextColor= '#444'
                        placeholder='Username'
                        autoCapitalize='none'
                        textContentType='username'
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                </View>

                <View style={[styles.inputField,
                    { borderColor:
                        imageUrl.length<1 || validUrl.isUri(imageUrl) ? '#ccc' : '#FD1D1D'
                    }
                ]}>
                    <TextInput 
                        onChangeText={(text) => setImageUrl(text)}
                        placeholder='Profile Picture'
                        placeholderTextColor= '#444' 
                        autoCapitalize='none'                   
                        value={imageUrl}
                    />
                </View>

                <View style={[styles.inputField,
                    { borderColor:
                        password.length<1 || password.length>=6 ? '#ccc' : '#FD1D1D'
                    }
                ]}>
                    <TextInput 
                        placeholderTextColor= '#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>

                <Pressable
                    titleSize={20}
                    style={styles.button(Validator.validate(email) && username.length>=2 && password.length>=6)}
                    onPress={register}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>

                <View style={styles.loginContainer}>
                    <Text>Already have an acoount? </Text>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </>
        </>
        </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60, 
    },
    wrapper: {
        marginTop: 80,
    },
    button: (isValid) => ({
        backgroundColor: isValid? '#0096F6': '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginTop: 30,
    }),
    buttonText: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 20,
    },
    inputField: {
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },
    loginContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    },
    loginText: {
        color: '#6BB0F5'
    },
})