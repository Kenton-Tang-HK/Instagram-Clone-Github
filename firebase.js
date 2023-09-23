// Import the functions you need from the SDKs you need
import { initializeApp , getApps , getApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
import { initializeAuth , getReactNativePersistence } from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd98YYIe_gE3a4_TsNbryNMnIYlagG7yM",
  authDomain: "instagram-react-native-fd5e9.firebaseapp.com",
  projectId: "instagram-react-native-fd5e9",
  storageBucket: "instagram-react-native-fd5e9.appspot.com",
  messagingSenderId: "50110910696",
  appId: "1:50110910696:web:2894e1c78adfa8e18db95d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const auth = getAuth(app)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { db , auth };