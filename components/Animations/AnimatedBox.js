import React from "react";
import { TouchableOpacity, Animated } from "react-native";

const AnimatedBox = ({ expanded, toggleExpand }) => {
  const minHeight = 80;
  const maxHeight = 200;
  const height = expanded ? maxHeight : minHeight;

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Animated.View
        style={{
          width: 350,
          height,
          backgroundColor: "black",
          margin: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default AnimatedBox;
