import React from "react";
import { Checkbox, IconButton } from "react-native-paper";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TaskView = (props) => {
  return (
    <TouchableOpacity onPress={props.onComplete} style={styles.touchable}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Checkbox.Android
            status={props.completed ? "checked" : "unchecked"}
            onPress={props.onToggle}
          />
          <Text
            style={[
              styles.itemText,
              props.completed ? styles.completedText : null,
            ]}
          >
            {props.text}
          </Text>
        </View>
        <IconButton
          style={styles.pencil}
          icon="pencil"
          onPress={props.onEdit}
        />
        <IconButton
          style={styles.trash}
          icon="trash-can"
          color="#FF0000"
          size={20}
          onPress={props.onDelete}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: "98%",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },
  itemText: {
    maxWidth: "80%",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  pencil: {},
  trash: {},
});

export default TaskView;
