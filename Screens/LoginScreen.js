import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { useDispatch } from "react-redux";
import loginApi from "../api/loginApi";
import {
  storeCredentials,
  retrieveStoredCredentials,
  clearStoredCredentials,
  dispatchUserValues,
} from "../utils/dispatchUserValues";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setEmail("");
  //   setPassword("");
  // });

  const handleLoginPress = () => {
    loginApi(email, password)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // console.log("response.data: ", response.data);
          dispatchUserValues(dispatch, response.data);
          // console.log("User signed in successfully:", response.message);
          navigation.navigate("ToDoPage");
        } else {
          console.error(
            "Unexpected status code:",
            response.message,
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
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
      {/* "Remember me" checkbox */}
      <View style={styles.rememberMeContainer}>
        <Checkbox.Android
          status={rememberMe ? "checked" : "unchecked"} // Use status prop to set checkbox state
          onPress={() => setRememberMe(!rememberMe)} // Toggle checkbox state onPress
        />
        <Text>Remember me</Text>
      </View>
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
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  signUpText: {
    flexDirection: "row",
    marginTop: 30,
  },
  signUpButton: {
    marginLeft: 5,
    color: "#5d0a0a",
    textDecorationLine: "underline",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LoginScreen;
