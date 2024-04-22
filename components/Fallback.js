import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Fallback(props) {
  return (
    <View style={styles.container}>
      <Text testID="fallbackText" style={styles.text}>
        Add your To-Do list here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // This makes the container take up the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAED",
  },
  //   container: {
  //     flex: 1, // Make the container take up the entire screen
  //     justifyContent: "center", // Center vertically
  //     alignItems: "center", // Center horizontally
  //     backgroundColor: "#E8EAED",
  //   },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0.5,
    color: "#333",
  },
});

export default Fallback;
