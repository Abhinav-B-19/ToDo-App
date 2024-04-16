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
  const [selectedDate, setSelectedDate] = useState(); //(new Date());
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
    if (selectedOption === option) {
      // If the option is already selected, unselect it
      setSelectedOption("");
      setSelectedDate(null); // Set selectedDate to null when deselecting an option
      onSelectDate(null, ""); // Pass null as the date and an empty string as the option
    } else {
      setSelectedOption(option);
      let date = new Date(); // Initialize date here
      if (option === "Custom") {
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
        onSelectDate(date, option);
      }
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
          {[
            "This Evening",
            "Tomorrow Morning",
            "Next Week",
            "Someday",
            "Custom",
          ].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                selectedOption === option && styles.selectedButton,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOption === option && styles.selectedButtonText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
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
    overflow: "scroll",
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
    backgroundColor: "brown",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default HorizontalScrollView;
