import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToDoPage from "../Screens/TodoPage";
import ActionBarImage from "./ActionBarImage";
import HomeScreen from "./HomeScreen";
import AnimatedCard from "./AnimatedCard";
import AniHomeScreen from "./Animations/AniHomeScreen";

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => <ActionBarImage />,
        style: {
          flexDirection: "row",
          justifyContent: "space-around", // Evenly space the tabs
          alignItems: "center", // Align items vertically
          height: 60, // Adjust tab bar height as needed
        },
      }}
    >
      <Tab.Screen
        name="Add Task"
        component={AniHomeScreen} //{AnimatedStyleUpdateExample} //{HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Animated"
        component={AnimatedCard} //{HomeScreen}
        options={{
          tabBarLabel: "Animated",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDay"
        component={ToDoPage}
        options={{
          tabBarLabel: "My Day",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              color={color}
              size={size}
            />
          ),
          tabBarButton: ({ onPress, children }) => (
            <TouchableOpacity
              onPress={() => {
                onPress(); // Maintain the tab's active state
                navigation.navigate("ToDoPage");
              }}
              style={{ flex: 1 }} // Each tab takes equal space
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
