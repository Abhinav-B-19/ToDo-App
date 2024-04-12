import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import { loadTaskItems, saveTaskItems, deleteTask } from "../Helper/Helper";

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIM_HEIGHT = WINDOW_HEIGHT * 0.1;

const DraggableBottomSheet = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: () => {},
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={StyleSheet.container}>
      <Animated.View style={StyleSheet.bottomSheet}>
        <View style={StyleSheet.draggableArea} {...panResponder.panHandlers}>
          <View style={StyleSheet.draggableHandle} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MAX_HEIGHT - BOTTOM_SHEET_MIM_HEIGHT,
    backgroundColor: red,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "a8bed2",
        opacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          height: 2,
          width: 2,
        },
      },
    }),
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 100,
    height: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  draggableHandle: {
    width: 100,
    height: 6,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
});

export default DraggableBottomSheet;
