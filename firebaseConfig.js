// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMritG-9o0bxZawR8OqUUAf-nLR2JeyWg",
  authDomain: "project1-b3594.firebaseapp.com",
  projectId: "project1-b3594",
  storageBucket: "project1-b3594.firebasestorage.app",
  messagingSenderId: "555518520691",
  appId: "1:555518520691:web:36e765b0c5d17aa2ef6906",
  measurementId: "G-YEQWD6QJFQ"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const firestore = getFirestore(app);

// Exportation des objets
export { app, firestore, firebaseConfig };
