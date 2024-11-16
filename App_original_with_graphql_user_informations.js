import React, { useState } from "react";
import { AccessToken, LoginButton } from "react-native-fbsdk-next";
import { firestore } from "./firebaseConfig"; // Assurez-vous que Firebase est configuré correctement
import { doc, getDoc, setDoc } from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = (error, result) => {
    if (error) {
      console.error("Login failed:", error);
    } else if (result.isCancelled) {
      console.log("Login cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(async (data) => {
        setIsLoggedIn(true);
        setUserInfo(data);

        const userID = data.userID;
        const accessToken = data.accessToken;

        // Récupérer les informations de l'utilisateur depuis l'API Graph de Facebook
        fetch(`https://graph.facebook.com/${userID}?fields=id,name,picture&access_token=${accessToken}`)
          .then((response) => response.json())
          .then(async (userData) => {
            console.log("User data:", userData);

            // Référence à un document dans la collection "users"
            const userDocRef = doc(firestore, "users", userID);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
              // Si l'utilisateur n'existe pas, créer un document
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
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      });
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <LoginButton
          onLoginFinished={handleLogin}
          onLogoutFinished={() => setIsLoggedIn(false)}
        />
      ) : (
        <Text>Bienvenue, {userInfo.userID}</Text>
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
