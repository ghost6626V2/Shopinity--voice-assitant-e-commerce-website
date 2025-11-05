import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-c5b92.firebaseapp.com",
  projectId: "loginonecart-c5b92",
  storageBucket: "loginonecart-c5b92.appspot.com",
  messagingSenderId: "847490579267",
  appId: "1:847490579267:web:b00c207f77c9d51dbf8df6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
