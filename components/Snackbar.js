import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const Snackbar = ({ visible, message, status }) => {
  const [show, setShow] = useState(visible);
  const [backgroundColor, setBackgroundColor] = useState("#5d0a0a"); // Default background color for error

  useEffect(() => {
    setShow(visible);
    if (status === "success") {
      setBackgroundColor("#2ecc71");
    } else if (status === "error") {
      setBackgroundColor("#e74c3c");
    }
  }, [visible, status]);

  const translateY = new Animated.Value(100);

  const showSnackbar = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShow(false));
  };

  useEffect(() => {
    if (show) {
      showSnackbar();
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 3000); // Snackbar will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={[styles.snackbar, { backgroundColor }]}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={hideSnackbar}>
          <Text style={styles.dismiss}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  snackbar: {
    backgroundColor: "#5d0a0a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
  },
  message: {
    color: "white",
    fontSize: 16,
  },
  dismiss: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Snackbar;
