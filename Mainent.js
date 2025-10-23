import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { firestore } from "./firebaseConfig"; // Assurez-vous que le firebaseConfig est correctement configuré
import { doc, getDoc } from "firebase/firestore"; // Importation des fonctions nécessaires de Firestore

const Mainent = () => {
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "",
  });

  useEffect(() => {
    // Fonction pour récupérer les données de l'utilisateur depuis Firestore
    const fetchUserData = async () => {
      try {
        // Remplacez "userID" par l'ID de l'utilisateur, vous pouvez l'obtenir via le login
        const userID = "userID"; // Utiliser un ID réel ici, exemple de l'ID utilisateur
        const userDocRef = doc(firestore, "users", userID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("Aucun utilisateur trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    };

    fetchUserData();
  }, []); // Le tableau vide [] signifie que ce hook s'exécute uniquement au montage du composant

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{userData.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50, // Pour rendre l'image ronde
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Mainent;
