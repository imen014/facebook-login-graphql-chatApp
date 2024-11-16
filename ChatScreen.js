import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from "react-native";
import { firestore } from "./firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";

const ChatScreen = ({ userInfo }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Récupérer les messages en temps réel
    const messagesRef = collection(firestore, "chats");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      // Récupérer les informations de l'utilisateur (nom et photo de profil) depuis Firestore
      const userDocRef = doc(firestore, "users", userInfo.userID);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log("Utilisateur introuvable dans Firestore");
        return;
      }

      const userData = userDoc.data(); // Récupérer les données de l'utilisateur

      // Ajouter un message à Firestore avec le nom et l'image de profil de l'utilisateur
      const messageRef = collection(firestore, "chats");
      await addDoc(messageRef, {
        text: message,
        userID: userInfo.userID,
        name: userData.name, // Ajouter le nom de l'utilisateur
        profilePicture: userData.profilePicture, // Ajouter l'image de profil
        createdAt: new Date(),
      });

      setMessage(""); // Réinitialiser le champ de message
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.profilePic}
            />
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Écrivez un message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Envoyer" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  messageText: {
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default ChatScreen;
