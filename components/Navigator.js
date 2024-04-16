import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToDoPage from "./ToDoPage"; // Assuming ToDoPage is in the same directory

const { Navigator, Screen } = createStackNavigator();

const Navbar = () => {
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
                    // const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
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

export default Navbar;
