import React, { useState } from "react";
import { AccessToken, LoginButton } from "react-native-fbsdk-next";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { firestore, firebaseConfig } from "./firebaseConfig"; // Importation de la configuration Firebase
import { initializeApp } from "firebase/app";
import ChatScreen from "./ChatScreen";

// Initialiser Firebase (si non déjà fait dans `firebaseConfig`)
const app = initializeApp(firebaseConfig);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Fonction de gestion de la connexion avec Facebook
  const handleLogin = (error, result) => {
    if (error) {
      console.error("Échec de la connexion :", error);
    } else if (result.isCancelled) {
      console.log("Connexion annulée.");
    } else {
      // Récupération du token d'accès de Facebook
      AccessToken.getCurrentAccessToken().then(async (data) => {
        setIsLoggedIn(true);
        setUserInfo(data);

        const userID = data.userID;
        const accessToken = data.accessToken;

        // Récupérer les informations de l'utilisateur via l'API Graph de Facebook
        try {
          const response = await fetch(`https://graph.facebook.com/${userID}?fields=id,name,picture&access_token=${accessToken}`);
          const userData = await response.json();
          
          if (userData.error) {
            console.error("Erreur de récupération des données de l'utilisateur :", userData.error.message);
            return;
          }
          
          console.log("Données de l'utilisateur récupérées :", userData);

          // Référence à un document dans la collection "users" de Firestore
          const userDocRef = doc(firestore, "users", userID);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Si l'utilisateur n'existe pas, créer un document dans Firestore
            await setDoc(userDocRef, {
              userID,
              name: userData.name,
              profilePicture: userData.picture.data.url,
              accessToken,
            });
            console.log("Utilisateur créé dans Firestore");
          } else {
            console.log("Utilisateur trouvé dans Firestore");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
        }
      });
    }
  };

  

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
       <LoginButton
       onLoginFinished={(error, result) => handleLogin(error, result)}
       onLogoutFinished={() => {
         setIsLoggedIn(false);
         setUserInfo(null);
       }}
     />
     
      ) : (
        // Afficher l'écran de chat une fois l'utilisateur connecté
        <ChatScreen userInfo={userInfo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
