import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TaskView from "./TaskView";
import Fallback from "./Fallback";
import HorizontalScrollView from "./HorizontalScrollView";
import { useNavigation } from "@react-navigation/native";
import TaskContext from "../Contexts/TaskContext";
import { loadTaskItems, saveTaskItems, deleteTask } from "../Helper/Helper";
import { Picker } from "@react-native-picker/picker";

const ToDoPage = () => {
  const [task, setTask] = useState("");
  // const [taskItems, setTaskItems] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [priority, setPriority] = useState("low");

  const { taskItems, setTaskItems } = useContext(TaskContext);

  useEffect(() => {
    loadTaskItems(setTaskItems);
  }, []);

  useEffect(() => {
    saveTaskItems(taskItems);
  }, [taskItems]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.length === 0) {
      alert("Please enter something!");
      return;
    }
    const currentDate = new Date(); // Get the current date and time
    setTaskItems([
      {
        text: task,
        completed: false,
        startDate: currentDate.toLocaleString(),
        dueDate: selectedDate ? selectedDate.toLocaleString() : null,
        priority: priority,
      },
      ...taskItems,
    ]);
    setTask("");
    setIsTyping(false);
    inputRef.current.blur();
  };

  const handleUpdateTask = () => {
    const updatedTasks = taskItems.map((item) => {
      if (item.text === editedTask) {
        return {
          ...item,
          completed: !item.completed,
          dueDate: !item.completed ? new Date().toLocaleString() : null,
          priority: priority,
        };
      }
      return item;
    });
    setTaskItems(updatedTasks);
    setEditedTask("");
    setTask("");
    setIsTyping(false);
    inputRef.current.blur();
  };

  const deleteTask = (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
          },
        },
      ]
    );
  };

  const handleEditTask = (task) => {
    setEditedTask(task.text);
    setTask(task.text);
  };

  const handleCompleteTask = (clickedTask) => {
    const updatedTaskItems = taskItems.map((item) => {
      if (item.text === clickedTask.text) {
        const updatedItem = {
          ...item,
          completed: !item.completed,
        };
        console.log("Updated Task:", updatedItem); // Print the updated item
        return updatedItem;
      }
      return item;
    });
    setTaskItems(updatedTaskItems);
  };

  const handleDateSelect = (date, option) => {
    setSelectedDate(date);
  };

  const handleInputChange = (text) => {
    setTask(text);
    setIsTyping(text.length > 0);
  };

  const handleScreenPress = () => {
    inputRef.current.blur();
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  const handleHomePress = () => {
    console.log("home presed");
    navigation.popToTop();
    navigation.navigate("MyTabs");
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleScreenPress}
      style={styles.container}
    >
      {taskItems.length === 0 && <Fallback />}
      <StatusBar style="auto" />
      <View style={styles.taskWrapper}>
        {/* <Text style={styles.sectionTitle}>Today's Tasks</Text> */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index}>
                <TaskView
                  onToggle={() => handleCompleteTask(item)}
                  onComplete={() => handleCompleteTask(item)}
                  onEdit={() => handleEditTask(item)}
                  onDelete={() => deleteTask(index)}
                  text={item.text}
                  completed={item.completed}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTextWrapper}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        {isTyping && <HorizontalScrollView onSelectDate={handleDateSelect} />}
        <View style={[styles.inputWrapper, { paddingTop: isTyping ? 10 : 20 }]}>
          {!isTyping && (
            <TouchableOpacity onPress={handleHomePress}>
              <View style={styles.homeWrapper}>
                <MaterialCommunityIcons
                  borderColor="blue"
                  name="home"
                  color={"blue"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          )}

          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={"I Want To ..."}
            value={task}
            onChangeText={handleInputChange}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />

          {isTyping &&
            (editedTask ? (
              <TouchableOpacity onPress={handleUpdateTask}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>Save</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  taskWrapper: {
    flex: 1,
    width: "100%",
    // paddingTop: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
    marginLeft: 10,
  },
  writeTextWrapper: {
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    //paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  homeWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C0C0C0",
    // borderWidth: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "75%",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  priorityPicker: {
    paddingBottom: 100,
  },
});

export default ToDoPage;
