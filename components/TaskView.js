import React, { useState } from "react";
import { Checkbox, IconButton, Colors } from "react-native-paper";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TaskView = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandView = () => {
    setExpanded(!expanded);
  };

  const getTimeElapsed = (startDate) => {
    const currentTime = new Date();
    const startTime = new Date(startDate);
    const elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    }
  };

  return (
    <TouchableOpacity
      onPress={handleExpandView}
      style={styles.touchable}
      testID="touchable" // Add testID here
    >
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Checkbox.Android
            status={props.completed ? "checked" : "unchecked"}
            onPress={props.onToggle}
            testID="taskCheckbox"
          />
          <Text
            style={[
              styles.itemText,
              props.completed ? styles.completedText : null,
            ]}
            numberOfLines={2} // Limit to 2 lines
            testID="taskTitle"
          >
            {props.text}
          </Text>
          <View style={styles.iconContainer}>
            <IconButton
              style={styles.pencil}
              icon="pencil"
              size={20}
              onPress={props.onEdit}
              testID="editButton"
            />
            <IconButton
              style={styles.importantIcon}
              icon="exclamation"
              iconColor={props.important ? "#00FF00" : "#FF0000"}
              size={20}
              onPress={props.changeImportant}
              testID="importantButton"
            />
            <IconButton
              style={styles.trash}
              icon="trash-can"
              color="#FF0000"
              size={20}
              onPress={props.onDelete}
              testID="deleteButton"
            />
          </View>
        </View>
        {expanded && (
          <View style={styles.expandedView}>
            <Text style={styles.additionalContent} testID="startDate">
              Started: {getTimeElapsed(props.startDate)}
            </Text>
            <Text style={styles.additionalContent} testID="descriptionText">
              Description: {props.description}
            </Text>
            <Text style={styles.additionalContent} testID="dueDateText">
              Due Date: {props.dueDate}
            </Text>
            <Text style={styles.additionalContent} testID="priorityText">
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
    width: "40%",
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
  importantIcon: {
    backgroundColor: "white",
    color: "#FF000",
  },
  additionalContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  expandedView: {},
});

export default TaskView;
