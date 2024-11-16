import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Mainent from "./Mainent";

function AuthenticatedComponent({ userInfo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, authenticated user!</Text>
      {userInfo && <Text>Your access token: {userInfo.accessToken}</Text>}
      <Text>Enjoy accessing exclusive content!</Text>
      <Mainent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AuthenticatedComponent;
