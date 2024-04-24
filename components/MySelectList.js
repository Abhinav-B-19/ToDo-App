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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    // position: "absolute",
    // top: 40,
    // width: "100%",
    // zIndex: 999,
  },
});

export default MySelectList;
