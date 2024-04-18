import {
  setUserId,
  setUserName,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
} from "../Slices/userSlice";
import { login } from "../Slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ==============================dispatchUtils
export const dispatchUserValues = (dispatch, userData) => {
  dispatch(login(true));
  dispatch(setUserId(userData.id));
  dispatch(setUserName(userData.userName));
  dispatch(setUserFirstName(userData.firstName));
  dispatch(setUserLastName(userData.lastName));
  dispatch(setUserEmail(userData.email));
  dispatch(setUserPassword(userData.password));
};

// ==============================rememberMeUtils
export const storeCredentials = async (email, password) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
  } catch (error) {
    console.error("Error storing credentials:", error);
  }
};

export const retrieveStoredCredentials = async () => {
  try {
    const storedEmail = await AsyncStorage.getItem("email");
    const storedPassword = await AsyncStorage.getItem("password");
    return { email: storedEmail, password: storedPassword };
  } catch (error) {
    console.error("Error retrieving stored credentials:", error);
    return { email: null, password: null };
  }
};

export const clearStoredCredentials = async () => {
  try {
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("password");
  } catch (error) {
    console.error("Error clearing stored credentials:", error);
  }
};
