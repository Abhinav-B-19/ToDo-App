import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const AnimatedCard = ({
  title,
  bottomText,
  expandedCardHeight,
  setExpandedCardHeight,
}) => {
  const minHeight = 50;
  const maxHeight = 200;

  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(minHeight);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => ({
    height: withTiming(height.value, config),
  }));

  const toggleHeight = () => {
    const newHeight = height.value === minHeight ? maxHeight : minHeight;
    height.value = newHeight;
    setIsExpanded((prevExpanded) => !prevExpanded);
    setExpandedCardHeight((prevHeight) => prevHeight + (newHeight - minHeight));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={toggleHeight}>
          <Animated.View style={[styles.box, style]}>
            <View style={styles.topContainer}>
              <Text style={styles.text}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.plusIcon}>
              <MaterialIcons name="add" size={24} color="black" />
            </TouchableOpacity>
            {isExpanded && (
              <View style={styles.bottomContainer}>
                {bottomText.map((text, index) => (
                  <Text key={index} style={styles.bottomText}>
                    {text}
                  </Text>
                ))}
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    width: 350,
    height: 0,
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
  },
  box: {
    width: 350,
    height: 200,
    backgroundColor: "white",
    margin: 20,
    opacity: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  topContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  plusIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  bottomContainer: {
    position: "absolute",
    top: 40,
    right: 10,
    left: 10,
  },
  bottomText: {
    fontSize: 16,
    margin: 7,
    left: 10,
  },
});

export default AnimatedCard;
