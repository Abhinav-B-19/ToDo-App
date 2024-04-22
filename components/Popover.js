import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Popover = ({ onSelectOption }) => {
  // State to track the visibility of the popover
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle selection of an option
  const handleOptionSelect = (option) => {
    onSelectOption(option);
    // Hide the popover after selecting an option
    setIsVisible(false);
  };

  return (
    <View style={styles.popover}>
      {/* Trigger button to show/hide the popover */}
      <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
        <Text>Show Popover</Text>
      </TouchableOpacity>
      {/* Render the popover content if it's visible */}
      {isVisible && (
        <View style={styles.popoverContent}>
          {/* Options */}
          <TouchableOpacity onPress={() => handleOptionSelect("Option 1")}>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect("Option 2")}>
            <Text>Option 2</Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popover: {
    position: "relative",
  },
  popoverContent: {
    position: "absolute",
    top: 30, // Adjust the position based on your layout
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    zIndex: 1, // Ensure the popover appears above other content
  },
});

export default Popover;

// import React from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// const Popover = ({ onSelectOption }) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => onSelectOption("sort")}>
//         <Text style={styles.option}>Sort</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => onSelectOption("filter")}>
//         <Text style={styles.option}>Filter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFF",
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     elevation: 3,
//   },
//   option: {
//     fontSize: 18,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
// });

// export default Popover;
