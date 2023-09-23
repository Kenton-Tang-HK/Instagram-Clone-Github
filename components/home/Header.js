import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"

const Header = ({ navigation }) => {

    const INSTAGRAM_LOGO_2 = 'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram-1.png'

    const signOutUser = () => {
        signOut(auth).then(() => {
          navigation.replace('LoginScreen')
        })
      }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={signOutUser}>
                <Image 
                    source={{uri: auth?.currentUser?.photoURL}} 
                    style ={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,     
                    }}
                />
        </TouchableOpacity>
        
        <Image 
            style={styles.logo} 
            source={{ uri: INSTAGRAM_LOGO_2 }}
        />
        
        <View >
            <TouchableOpacity onPress={() => navigation.push('NewPost')} >
                <Image 
                    style={styles.icon} 
                    source={{ uri: "https://img.icons8.com/ios/50/plus--v1.png" }}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 55,
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadge: {
        backgroundColor: '#FD1D1D',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 16,
        borderRadius: 20,
        alignItems: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600',
    }
})