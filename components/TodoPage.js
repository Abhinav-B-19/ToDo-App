import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TaskView from "./TaskView";
import Fallback from "./Fallback";
import HorizontalScrollView from "./HorizontalScrollView";
import { useNavigation } from "@react-navigation/native";

const ToDoPage = () => {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const inputRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadTaskItems();
  }, []);

  useEffect(() => {
    saveTaskItems();
  }, [taskItems]);

  const loadTaskItems = async () => {
    try {
      const storedTaskItems = await AsyncStorage.getItem("taskItems");
      if (storedTaskItems !== null) {
        setTaskItems(JSON.parse(storedTaskItems));
      }
    } catch (error) {
      alert("Error loading task items:", error);
      console.error("Error loading task items:", error);
    }
  };

  const saveTaskItems = async () => {
    try {
      await AsyncStorage.setItem("taskItems", JSON.stringify(taskItems));
    } catch (error) {
      alert("Error saving task items:", error);
      console.error("Error saving task items:", error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.length === 0) {
      alert("Please enter something!");
      return;
    }
    setTaskItems([
      {
        text: task,
        completed: false,
        completionDate: selectedDate ? selectedDate.toLocaleString() : null, // Use selected date if available
      },
      ...taskItems,
    ]);
    setTask("");
    setIsTyping(false);
    inputRef.current.blur(); // Remove focus from the text input
  };

  const handleUpdateTask = () => {
    const updatedTasks = taskItems.map((item) => {
      if (item.text === editedTask) {
        return {
          ...item,
          completed: !item.completed,
          completionDate: !item.completed ? new Date().toLocaleString() : null,
        };
      }
      return item;
    });
    setTaskItems(updatedTasks);
    setEditedTask("");
    setTask("");
    setIsTyping(false);
    inputRef.current.blur(); // Remove focus from the text input
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleEditTask = (task) => {
    setEditedTask(task.text);
    setTask(task.text);
  };

  const handleCompleteTask = (clickedTask) => {
    const updatedTaskItems = taskItems.map((item) => {
      if (item.text === clickedTask.text) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    setTaskItems(updatedTaskItems);
    console.log(updatedTaskItems);
  };

  const handleDateSelect = (date, option) => {
    setSelectedDate(date); // Set selected date
    // Handle selected option here
  };

  const handleInputChange = (text) => {
    setTask(text);
    setIsTyping(text.length > 0);
  };

  const handleScreenPress = () => {
    inputRef.current.blur(); // Remove focus from the text input when screen is pressed
  };

  const handleHomePress = () => {
    console.log("home presed");
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
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
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
        // keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // Adjust the vertical offset as needed
      >
        {isTyping && (
          <HorizontalScrollView
            onSelectDate={handleDateSelect} // Pass callback to receive selected date
          />
        )}
        <View style={[styles.inputWrapper, { paddingTop: isTyping ? 10 : 20 }]}>
          {!isTyping && (
            <TouchableOpacity onPress={handleHomePress}>
              <View style={styles.homeWrapper}>
                <MaterialCommunityIcons
                  borderColor="blue"
                  name="home"
                  color={"lightblue"}
                  size={30}
                />
              </View>
            </TouchableOpacity>
          )}

          <TextInput
            ref={inputRef} // Assign the ref to the text input
            style={styles.input}
            placeholder={"Write a Task."}
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
    paddingTop: 80,
    paddingHorizontal: 20,
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
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    //paddingTop: 20,
    paddingBottom: 20,
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
});

export default ToDoPage;
