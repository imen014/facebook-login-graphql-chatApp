import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Mainent from "./Mainent";


function LoggedInComponent({ userInfo, onLogout }) {
  return (
    <View style={styles.loggedInContainer}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      {userInfo && <Text>Your User ID: {userInfo.userID}</Text>}
      {userInfo && <Text>Your User NAME: {userInfo.username}</Text>}
      {userInfo && <Mainent />}

      <Button title="Logout" onPress={onLogout} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  loggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default LoggedInComponent;
