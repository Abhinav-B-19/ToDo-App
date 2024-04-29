import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AnimatedCard from "../AnimatedCard";

const AniHomeScreen = () => {
  const [expandedCardHeight, setExpandedCardHeight] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [cardStates, setCardStates] = useState([]);

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
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { minHeight: expandedCardHeight },
        ]}
        horizontal={true}
      >
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.cardContainer}>
            <AnimatedCard
              title={day}
              bottomText={[`Details for ${day}`]}
              expandedCardHeight={expandedCardHeight}
              setExpandedCardHeight={setExpandedCardHeight}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexDirection: "column",
  },
  cardContainer: {
    marginBottom: 70,
  },
});

export default AniHomeScreen;
