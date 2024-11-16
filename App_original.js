import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { AccessToken, LoginButton, Settings } from "react-native-fbsdk-next";

export default function App() {
  useEffect(() => {
    const requestTracking = async () => {
      const { status } = await requestTrackingPermissionsAsync();
      Settings.initializeSDK();
      if (status === "granted") {
        await Settings.setAdvertiserIDCollectionEnabled(true);
      }
    };

    // Call the requestTracking function once when the component is mounted
    requestTracking();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <View style={styles.container}>
      <LoginButton
        onLogoutFinished={() => console.log("Logged out")}
        onLoginFinished={(error, data) => {
          console.log(error || data);
          AccessToken.getCurrentAccessToken().then((data) => console.log(data));
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
