// __mocks__/@react-native-community/datetimepicker.js

import React from "react";
import { View, Text } from "react-native";

const DateTimePickerModal = ({ isVisible, onConfirm, onCancel }) => {
  if (isVisible) {
    // Render something to indicate that the DateTimePicker is visible
    return (
      <View>
        <Text testID="date-time-picker">DateTimePicker is visible</Text>
      </View>
    );
  } else {
    // Return null if the DateTimePicker is not visible
    return null;
  }
};

export default DateTimePickerModal;
