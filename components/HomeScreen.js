import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  useEffect(() => {
    const today = new Date();
    const todayIndex = today.getDay();
    const dayLabels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const updatedDaysOfWeek = [
      "Today",
      "Tomorrow",
      ...dayLabels.slice(todayIndex + 2),
      ...dayLabels.slice(0, todayIndex),
      "Later",
    ];

    setDaysOfWeek(updatedDaysOfWeek);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Home Screen!</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => toggleExpand(index)}>
            <View
              style={[
                styles.card,
                expandedCard === index && styles.expandedCard,
              ]}
            >
              <View style={styles.dayContainer}>
                <Text style={styles.day}>{day}</Text>
                <TouchableOpacity
                  onPress={() => console.log("Plus button pressed")}
                >
                  <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
              {expandedCard === index && (
                <Text style={styles.detail}>Details for {day}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardsContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  card: {
    width: 350,
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  expandedCard: {
    height: 120,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detail: {
    marginTop: 5,
  },
});

export default HomeScreen;
