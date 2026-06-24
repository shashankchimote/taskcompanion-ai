import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBs8bUVVNY_ghJiSpmKSliqlvnS7gVcJs",
  authDomain: "taskcompanion-ai.firebaseapp.com",
  projectId: "taskcompanion-ai",
  storageBucket: "taskcompanion-ai.firebasestorage.app",
  messagingSenderId: "929069182384",
  appId: "1:929069182384:web:3506f164cd2659c9557a75",
  measurementId: "G-ZEHWY9RG4P",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { signOut };