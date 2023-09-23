import { StyleSheet, Text, View , SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Posts from '../components/home/Posts'

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>   
        <Header navigation={navigation}/> 
        <ScrollView>
            <Posts navigation={navigation}/>
        </ScrollView> 
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
})