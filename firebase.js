import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCxd0N6Pqg9NCgR_oCPmhQtDiZtMmuhla0",
  authDomain: "laundryapp-bc5b4.firebaseapp.com",
  projectId: "laundryapp-bc5b4",
  storageBucket: "laundryapp-bc5b4.appspot.com",
  messagingSenderId: "172766477331",
  appId: "1:172766477331:web:9117579961f7e846a313e6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = getAuth(app);
} catch (error) {
  // Handle auth/already-initialized error
  auth = initializeAuth(app, {
    persistence: 'local',
    asyncStorage: AsyncStorage
  });
}

const db = getFirestore();

export { auth, db };
