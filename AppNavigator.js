import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import ToDoPage from "./Screens/TodoPage";
import SignUpPage from "./Screens/SignUpPage";
import MyTabs from "./components/MyTabs";
import ActionBarImage from "./components/ActionBarImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const { Navigator, Screen } = createStackNavigator();

const ToDoStackNavigator = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const UserId = useSelector((state) => state.user.userId);
  const login = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.user.email);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const userName = useSelector((state) => state.user.userName);

  const handleLogout = (navigation) => {
    console.log("handleLogout");
    navigation.navigate("LoginScreen");
  };

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
                onPress={() => navigation.navigate("LoginScreen")}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <MaterialCommunityIcons
                name="account"
                size={24}
                color="black"
                onPress={() => setDropdownVisible(true)}
              />
              <Modal
                visible={dropdownVisible}
                transparent={true}
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  onPress={() => setDropdownVisible(false)}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => handleLogout(navigation)}>
                      <Text style={{ paddingVertical: 10 }}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
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
        <Screen
          options={{ gestureEnabled: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Screen
          options={{ gestureEnabled: false }}
          name="ToDoPage"
          component={ToDoStackNavigator}
        />
        <Screen
          options={{ gestureEnabled: false }}
          name="SignUpPage"
          component={SignUpPage}
        />
        <Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            gestureEnabled: false,
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
