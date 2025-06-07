import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBj6FFw3kSkP8-mDg4SJDepR-zV8kUfgHk",
  authDomain: "socialmediaapp-78912.firebaseapp.com",
  projectId: "socialmediaapp-78912",
  storageBucket: "socialmediaapp-78912.firebasestorage.app",
  messagingSenderId: "132484795674",
  appId: "1:132484795674:web:22c62a0c56295362ad30a3",
  measurementId: "G-LWSGZLJ49P"
};

const app = initializeApp(firebaseConfig);

export default app;