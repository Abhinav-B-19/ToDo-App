import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import ToDoPage from "./Screens/TodoPage";
import SignUpPage from "./Screens/SignUpPage";
import MyTabs from "./components/MyTabs";
import ActionBarImage from "./components/ActionBarImage";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
const { Navigator, Screen } = createStackNavigator();

const ToDoStackNavigator = () => {
  const login = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.user.email);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const userName = useSelector((state) => state.user.userName);
  return (
    <Navigator>
      <Screen
        name="ToDoPage Stack"
        component={ToDoPage}
        options={({ navigation }) => ({
          title: "My Day",
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <MaterialCommunityIcons
                name="menu"
                size={24}
                color="black"
                // onPress={() => navigation.openDrawer()}
                onPress={() => {
                  console.log("\nUser Info:");
                  console.log("Email:", userEmail);
                  console.log("First Name:", firstName);
                  console.log("Last Name:", lastName);
                  console.log("Username:", userName);
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color="black"
                onPress={async () => {
                  try {
                    // const userEmail = await AsyncStorage.getItem("userEmail");
                    //const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
                    alert(`${userEmail} + ${login}`);
                  } catch (error) {
                    console.error("Error loading user email:", error);
                    return null;
                  }
                }}
              />
            </View>
          ),
        })}
      />
    </Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none" initialRouteName="LoginScreen">
        <Screen name="LoginScreen" component={LoginScreen} />
        <Screen name="ToDoPage" component={ToDoStackNavigator} />
        <Screen name="SignUpPage" component={SignUpPage} />
        <Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            title: "MyTabs",
            headerLeft: () => <ActionBarImage />,
            headerRight: () => (
              <Text
                style={{ marginRight: 10, fontWeight: "bold" }}
                onPress={() => console.log("Profile clicked")}
              >
                Profile
              </Text>
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
