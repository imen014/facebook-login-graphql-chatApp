// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: "projectName-projectId.firebaseapp.com",
  projectId: "projectName-projectId",
  storageBucket: "project1-b3594.firebasestorage.app",
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_API_ID,
  measurementId: YOUR_MEASURE_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const firestore = getFirestore(app);

// Exportation des objets
export { app, firestore, firebaseConfig };
