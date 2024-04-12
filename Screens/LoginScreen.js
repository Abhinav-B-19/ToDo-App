import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../Slices/authSlice";
import { setUserEmail } from "../Slices/userSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // if (email === "user@example.com" && password === "password") {
  //   try {
  //     // Save login state
  //     await AsyncStorage.setItem("isLoggedIn", "true");
  //     console.log("Login state saved successfully.");
  //     await AsyncStorage.setItem("userEmail", email);
  //     navigation.navigate("ToDoPage");
  //   } catch (error) {
  //     console.log("Error saving login state:", error);
  //   }
  // } else {
  //   console.log("Invalid email or password.");
  // }

  const handleLoginPress = () => {
    // handleLogin(email, password, navigation);
    if (email === "user@example.com" && password === "password") {
      dispatch(login());
      dispatch(setUserEmail(email));
      navigation.navigate("ToDoPage");
    } else {
      console.log("Invalid email or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginPress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.signUpText}>
        <Text>New user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#5d0a0a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f3f3f3",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#5d0a0a",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#5d0a0a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  signUpText: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpButton: {
    marginLeft: 5,
    color: "#5d0a0a",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
