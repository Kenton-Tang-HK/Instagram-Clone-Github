import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'; 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen';
import CommentScreen from './screens/CommentScreen';

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='NewPost' component={NewPostScreen} />
        <Stack.Screen name='CommentScreen' component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
