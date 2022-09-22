import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyCky-laZPPkBuFfTP_RBAWAhXsZYO8SnW8",
  authDomain: "login-5549d.firebaseapp.com",
  projectId: "login-5549d",
  storageBucket: "login-5549d.appspot.com",
  messagingSenderId: "556959723820",
  appId: "1:556959723820:web:8bc213dd42f92a88367c89"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//iniciar base de datos
const db = getFirestore();

const auth = getAuth(); // para poder usar el auth y crear un usuario

export { auth, db};
