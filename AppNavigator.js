// AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/LoginScreen";
import ToDoPage from "./components/TodoPage";
import SignUpPage from "./components/SignUpPage";
import MyTabs from "./components/MyTabs";
import ActionBarImage from "./components/ActionBarImage";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        options={{ headerShown: false }}
        initialRouteName="LoginScreen"
      >
        <Screen name="LoginScreen" component={LoginScreen}></Screen>
        <Screen name="ToDoPage" component={ToDoPage}></Screen>
        <Screen name="SignUpPage" component={SignUpPage}></Screen>
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
          screenOptions={{ headerLeft: () => <ActionBarImage /> }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
