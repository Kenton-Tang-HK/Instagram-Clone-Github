import { StyleSheet, View , Text, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import Validator from 'email-validator' 

const INSTAGRAM_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png'

const LoginScreen = ({ navigation }) => {

  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  
  useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
              navigation.replace("Home");
          }
      });

      return unsubscribe;
  },[])

  const signIn  = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: INSTAGRAM_LOGO }}
            style={{ width: 100, height: 100 }}
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
                        placeholder='Phone number, username or email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
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
                        onSubmitEditing={signIn}
                    />
                </View>
                    
                <Pressable
                    titleSize={20}
                    style={styles.button(Validator.validate(email) && password.length>=6)}
                    onPress={signIn}
                    disabled={!(Validator.validate(email) && password.length>=6)}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>

                <View style={styles.signupContainer}>
                    <Text>Don't have an acoount? </Text>
                    <TouchableOpacity onPress={()=>navigation.push('Register')}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
              </>
          </>
        </View>
    </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 150, 
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
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    },
    signupText: {
        color: '#6BB0F5'
    },
})