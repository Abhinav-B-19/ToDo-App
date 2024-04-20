import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { WINDOW_HEIGHT } from "../Helper/Helper";

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.3;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.05;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const MAX_DESCRIPTION_LENGTH = 250;

const DraggableBottomSheet = ({
  setTyping,
  selectedPriority,
  setSelectedPriority,
  setDescription,
  description,
}) => {
  const [remainingChars, setRemainingChars] = useState(MAX_DESCRIPTION_LENGTH);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.setOffset(0);
        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            sprintAnimation("up");
          } else {
            sprintAnimation("down");
          }
        } else {
          // dragging up
          if (Math.abs(gesture.dy) <= DRAG_THRESHOLD) {
            sprintAnimation("down");
          } else {
            sprintAnimation("up");
          }
        }
      },
    })
  ).current;

  const sprintAnimation = (direction) => {
    lastGestureDy.current =
      direction === "down" ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setRemainingChars(MAX_DESCRIPTION_LENGTH - text.length);
  };

  const handleContainerPress = () => {
    setTyping(true);
  };

  return (
    <TouchableOpacity
      onPress={handleContainerPress}
      style={styles.container}
      activeOpacity={1}
    >
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.draggableHandle} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                onChangeText={handleDescriptionChange}
                style={styles.input}
                multiline
                maxLength={MAX_DESCRIPTION_LENGTH}
                placeholder="Enter description..."
                value={description}
              />
              <Text style={styles.remainingCharsText}>
                Remaining characters: {remainingChars}
              </Text>
            </View>
            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Priority</Text>
              <View style={styles.priorityOptions}>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedPriority === "Low" && styles.selectedButton,
                  ]}
                  onPress={() => handlePriorityChange("Low")}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedPriority === "Low" && styles.selectedButtonText,
                    ]}
                  >
                    Low
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedPriority === "Moderate" && styles.selectedButton,
                  ]}
                  onPress={() => handlePriorityChange("Moderate")}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedPriority === "Moderate" &&
                        styles.selectedButtonText,
                    ]}
                  >
                    Moderate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    selectedPriority === "High" && styles.selectedButton,
                  ]}
                  onPress={() => handlePriorityChange("High")}
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedPriority === "High" && styles.selectedButtonText,
                    ]}
                  >
                    High
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    // backgroundColor: "gray",
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: "100%",
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  priorityContainer: {
    marginTop: 20,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priorityOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  selectedButton: {
    backgroundColor: "brown",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default DraggableBottomSheet;
