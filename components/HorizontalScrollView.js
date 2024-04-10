import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const HorizontalScrollView = ({ onSelectDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    onSelectDate(date, selectedOption);
  };

  const handleOptionSelect = (option) => {
    let date = new Date(); // Initialize date here

    if (option === "Custom") {
      setSelectedOption("Custom");
      showDatePicker();
    } else {
      if (option === "This Evening") {
        date.setHours(18, 0, 0, 0);
      } else if (option === "Tomorrow Morning") {
        date.setDate(date.getDate() + 1);
        date.setHours(10, 0, 0, 0);
      } else if (option === "Next Week") {
        date.setDate(date.getDate() + 7);
        date.setHours(10, 0, 0, 0);
      } else if (option === "Someday") {
        date.setDate(date.getDate() + Math.floor(Math.random() * 30));
        date.setHours(12, 0, 0, 0);
      }

      setSelectedDate(date);
      setSelectedOption(option);
      onSelectDate(date, option);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "This Evening" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("This Evening")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === "This Evening" && styles.selectedButtonText,
              ]}
            >
              This Evening
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "Tomorrow Morning" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("Tomorrow Morning")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === "Tomorrow Morning" &&
                  styles.selectedButtonText,
              ]}
            >
              Tomorrow Morning
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "Next Week" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("Next Week")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === "Next Week" && styles.selectedButtonText,
              ]}
            >
              Next Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "Someday" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("Someday")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === "Someday" && styles.selectedButtonText,
              ]}
            >
              Someday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "Custom" && styles.selectedButton,
            ]}
            onPress={() => handleOptionSelect("Custom")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === "Custom" && styles.selectedButtonText,
              ]}
            >
              Custom
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {selectedOption === "Custom" && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 60,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "brown", // Highlight color
  },
  selectedButtonText: {
    color: "white", // Text color when highlighted
  },
});

export default HorizontalScrollView;
