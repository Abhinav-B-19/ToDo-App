import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const MySelectList = ({ options, onSelectOption }) => {
  // Accept options as props
  return (
    <View style={styles.container}>
      <SelectList setSelected={onSelectOption} data={options} save="value" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 999,
  },
});

export default MySelectList;

// import React from "react";
// import { View, StyleSheet } from "react-native"; // Import View and StyleSheet
// import { SelectList } from "react-native-dropdown-select-list";

// const MySelectList = ({ setSelected }) => {
//   const data = [
//     { key: "1", value: "Mobiles", disabled: true },
//     { key: "2", value: "Appliances" },
//     { key: "3", value: "Cameras" },
//     { key: "4", value: "Computers", disabled: true },
//     { key: "5", value: "Vegetables" },
//     { key: "6", value: "Dairy Products" },
//     { key: "7", value: "Drinks" },
//   ];

//   return (
//     <View style={styles.container}>
//       <SelectList setSelected={setSelected} data={data} save="value" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default MySelectList;
