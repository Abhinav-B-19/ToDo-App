import React, { useState } from "react";
import { Checkbox, IconButton } from "react-native-paper";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TaskView = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandView = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={handleExpandView} style={styles.touchable}>
      <View style={styles.item}>
        <View style={styles.itemContent}>
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
          <View style={styles.iconContainer}>
            <IconButton
              style={styles.pencil}
              icon="pencil"
              size={20}
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
        </View>
        {expanded && (
          <View style={styles.expandedView}>
            <Text style={styles.additionalContent}>
              Description: {props.description}
            </Text>
            <Text style={styles.additionalContent}>
              Due Date: {props.dueDate}
            </Text>
            <Text style={styles.additionalContent}>
              Priority: {props.priority}
            </Text>
          </View>
        )}
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
    marginBottom: 20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 10,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    maxWidth: "60%",
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  iconContainer: {
    flexDirection: "row",
  },
  pencil: {
    backgroundColor: "white",
  },
  trash: {
    backgroundColor: "white",
  },
  additionalContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  expandedView: {},
});

export default TaskView;
