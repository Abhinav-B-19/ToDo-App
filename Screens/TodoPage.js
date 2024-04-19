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
import addTodoApi from "../api/appTodoApi";
import updateTodoApi from "../api/updateTodoApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TaskView from "../components/TaskView";
import Fallback from "../components/Fallback";
import HorizontalScrollView from "../components/HorizontalScrollView";
import { useNavigation } from "@react-navigation/native";
import TaskContext from "../Contexts/TaskContext";
import { loadTaskItems, saveTaskItems, deleteTask } from "../Helper/Helper";
import DraggableBottomSheet from "../components/DraggableBottomSheet";
import getToDoApi from "../api/getToDoApi";
import { useSelector } from "react-redux";

const ToDoPage = () => {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [selectedDate, setSelectedDate] = useState(null);
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [taskId, setTaskId] = useState("");
  // const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState("");
  const userId = useSelector((state) => state.user.userId);

  // const { taskItems, setTaskItems } = useContext(TaskContext);
  const currentDate = new Date();

  const todoData = {
    task: task,
    completed: false,
    startDate: currentDate.toISOString(),
    dueDate: selectedDate ? selectedDate.toISOString() : null,
    priority: selectedPriority,
    description: description,
    userId: userId,
    taskId: taskId,
    important: isImportant,
  };

  useEffect(() => {
    setApiData();
    // loadTaskItems(setTaskItems);
  }, []);

  useEffect(() => {
    // saveTaskItems(taskItems);
  }, [taskItems]);

  const setApiData = async () => {
    try {
      getToDoApi(userId)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            // console.log("Todos fetched successfully:", response.data.todos);

            // Map over each todo item in the response data and create a new array of task items
            const newTaskItems = response.data.todos.map((todo) => ({
              task: todo.task,
              completed: todo.completed,
              startDate: todo.startDate,
              dueDate: todo.dueDate,
              priority: todo.priority, // Assuming 'priority' is the correct property name
              description: todo.description,
              userId: todo.userId,
              taskId: todo.taskId,
              important: todo.important,
            }));

            // Update the task items state by combining the new task items with the existing ones
            setTaskItems([...newTaskItems]);
          } else {
            console.error("Failed to fetch todos:", response.status);
            // Handle failure
          }
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
          // Handle error
        });
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Handle error
    }
  };

  const setTyping = (value) => {
    setIsTyping(value);
  };

  const handleAddTask = async () => {
    Keyboard.dismiss();
    if (task.length === 0) {
      getToDoApi();
      alert("Please enter something!");
      return;
    }
    // setTaskItems([
    //   {
    //     text: task,
    //     completed: false,
    //     startDate: currentDate.toLocaleString(),
    //     dueDate: selectedDate ? selectedDate.toLocaleString() : null,
    //     selectedPriority: selectedPriority,
    //     description: description,
    //   },
    //   ...taskItems,
    // ]);

    // addTodoApi(task);

    try {
      const response = await addTodoApi(userId, todoData);
      if (response.status === 200 || response.status === 201) {
        // Handle success
        // Prepend the new task to the taskItems array
        setTaskItems((prevTaskItems) => [
          {
            task: task,
            completed: false,
            startDate: currentDate.toLocaleString(),
            dueDate: selectedDate ? selectedDate.toLocaleString() : null,
            priority: selectedPriority,
            description: description,
            important: isImportant,
          },
          ...prevTaskItems,
        ]);
      } else {
        console.error("Failed to add todo:", response.status);
        // Handle failure
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      // Handle error
    }

    // getToDoApi();

    setTask("");
    setIsTyping(false);
    inputRef.current.blur();
    setApiData();
  };

  const handleUpdateTask = async () => {
    console.log("editedTask: ", editedTask);
    const index = taskItems.findIndex((item) => item.taskId === editedTask);

    if (index !== -1) {
      const updatedTaskItem = {
        ...taskItems[index],
        task: task,
        completed: taskItems[index].completed,
        startDate: taskItems[index].startDate,
        dueDate: selectedDate,
        priority: selectedPriority,
        description: description,
        important: isImportant,
      };

      console.log("updatedTaskItem: ", updatedTaskItem);
      try {
        const response = await updateTodoApi([updatedTaskItem]);
        if (response && (response.status === 200 || response.status === 201)) {
          // console.log("Todo updated successfully:", response.data);
          // Update the task item at the found index in the task items array
          setTaskItems((prevTaskItems) => {
            const updatedItems = [...prevTaskItems];
            updatedItems[index] = updatedTaskItem;
            return updatedItems;
          });
        } else {
          console.error(
            "Failed to update todo:",
            response ? response.status : "Unknown error"
          );
          // Handle failure
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        // Handle error
      }
    }

    // const updatedTasks = taskItems.map((item) => {
    //   if (item.taskId === editedTask) {
    //     return {
    //       ...item,
    //       task: task,
    //       completed: item.completed,
    //       startDate: item.startDate,
    //       dueDate: selectedDate,
    //       priority: selectedPriority,
    //       description: description,
    //     };
    //   }
    //   return item;
    // });

    // console.log("updatedTasks: ", updatedTasks);

    // If the clicked task is found, update its completion status
    // if (index !== -1) {
    //   const updatedTaskItem = {
    //     ...taskItems[index],
    //     completed: !taskItems[index].completed,
    //   };

    //   try {
    //     const response = await updateTodoApi([updatedTaskItem]);
    //     if (response && (response.status === 200 || response.status === 201)) {
    //       // console.log("Todo updated successfully:", response.data);
    //       // Update the task item at the found index in the task items array
    //       setTaskItems((prevTaskItems) => {
    //         const updatedItems = [...prevTaskItems];
    //         updatedItems[index] = updatedTaskItem;
    //         return updatedItems;
    //       });
    //     } else {
    //       console.error(
    //         "Failed to update todo:",
    //         response ? response.status : "Unknown error"
    //       );
    //       // Handle failure
    //     }
    //   } catch (error) {
    //     console.error("Error updating todo:", error);
    //     // Handle error
    //   }
    // }
    // const updated1Tasks = async (updatedTasks) => {
    //   try {
    //     console.log("updatedTasks in updated1Tasks: ", updatedTasks);
    //     const response = await updateTodoApi(updatedTasks);
    //     if (response.status === 200 || response.status === 201) {
    //       console.log("Todo added/updated successfully:", response.data);
    //       // Handle success
    //       return response.data; // Return the updated todo data
    //     } else {
    //       console.error("Failed to add/update todo:", response.status);
    //       // Handle failure
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error("Error adding/updating todo:", error);
    //     // Handle error
    //     return null;
    //   }
    // };
    // setTaskItems(updatedTasks);
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

  const handleEditTask = (todo) => {
    setIsTyping(true);
    setEditedTask(todo.taskId);
    setTask(todo.task);
  };

  const handleCompleteTask = async (clickedTask) => {
    // Find the index of the clicked task
    const index = taskItems.findIndex(
      (item) => item.taskId === clickedTask.taskId
    );

    // If the clicked task is found, update its completion status
    if (index !== -1) {
      const updatedTaskItem = {
        ...taskItems[index],
        completed: !taskItems[index].completed,
      };

      try {
        const response = await updateTodoApi([updatedTaskItem]);
        if (response && (response.status === 200 || response.status === 201)) {
          // console.log("Todo updated successfully:", response.data);
          // Update the task item at the found index in the task items array
          setTaskItems((prevTaskItems) => {
            const updatedItems = [...prevTaskItems];
            updatedItems[index] = updatedTaskItem;
            return updatedItems;
          });
        } else {
          console.error(
            "Failed to update todo:",
            response ? response.status : "Unknown error"
          );
          // Handle failure
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        // Handle error
      }
    }
  };

  // const handleCompleteTask = async (clickedTask) => {
  //   // const updatedTaskItems = taskItems.map((item) => {
  //   //   //find filter
  //   //   if (item.text === clickedTask.text) {
  //   //     const updatedItem = {
  //   //       ...item,
  //   //       completed: !item.completed,
  //   //     };
  //   //     return updatedItem;
  //   //   }
  //   //   return item;
  //   // });

  //   const updatedTaskItems = taskItems
  //     .filter((item) => {
  //       return item.text === clickedTask.text;
  //     })
  //     .map((item) => {
  //       return {
  //         ...item,
  //         completed: !item.completed,
  //       };
  //     });

  //   console.log(
  //     "\nclickedTask: ",
  //     clickedTask,
  //     "\n\nupdatedTaskItems ",
  //     updatedTaskItems
  //   );

  //   try {
  //     const response = await updateTodoApi(userId, updatedTaskItems);
  //     if (response.status === 200 || response.status === 201) {
  //       console.log("\n\nUpdated: ", response.data);
  //       setApiData();
  //       // Handle success
  //       // Other code...
  //     } else {
  //       console.error("Failed to update todo:", response.status);
  //       // Handle failure
  //     }
  //   } catch (error) {
  //     console.error("Error updating todo:", error);
  //     // Handle error
  //   }

  //   // setTaskItems(updatedTaskItems);
  // };

  const handleDateSelect = (date, option) => {
    setSelectedDate(date);
  };

  const handleInputChange = (text) => {
    setTask(text);
    setIsTyping(text.length > 0);
  };

  const handleScreenPress = () => {
    inputRef.current.blur();
    setIsTyping(false);
  };

  // const handlePriorityChange = (newPriority) => {
  //   setSelectedPriority(newPriority);
  // };

  const handleHomePress = () => {
    console.log("home presed");
    navigation.popToTop();
    navigation.navigate("MyTabs");
  };

  const handleExpandView = (index) => {
    console.log("to be expanded", index);
  };

  const changeImportant = async (taskId) => {
    setIsImportant(!isImportant);
    console.log("changeImportant ", taskId, isImportant);
    const index = taskItems.findIndex((item) => item.taskId === taskId);

    // If the clicked task is found, update its completion status
    if (index !== -1) {
      const updatedTaskItem = {
        ...taskItems[index],
        important: !taskItems[index].important,
      };

      try {
        const response = await updateTodoApi([updatedTaskItem]);
        if (response && (response.status === 200 || response.status === 201)) {
          // console.log("Todo updated successfully:", response.data);
          // Update the task item at the found index in the task items array
          setTaskItems((prevTaskItems) => {
            const updatedItems = [...prevTaskItems];
            updatedItems[index] = updatedTaskItem;
            return updatedItems;
          });
        } else {
          console.error(
            "Failed to update todo:",
            response ? response.status : "Unknown error"
          );
          // Handle failure
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        // Handle error
      }
    }
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
                  text={item.task}
                  description={item.description}
                  dueDate={item.dueDate}
                  startDate={item.startDate}
                  priority={item.priority}
                  onExpandView={() => handleExpandView(item)}
                  completed={item.completed}
                  important={item.important}
                  changeImportant={() => changeImportant(item.taskId)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* {isTyping && <DraggableBottomSheet />} */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTextWrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        {isTyping && (
          <DraggableBottomSheet
            setTyping={setIsTyping}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            setDescription={setDescription}
          />
        )}
        <View style={styles.inputComponents}>
          {isTyping && <HorizontalScrollView onSelectDate={handleDateSelect} />}
          <View
            style={[styles.inputWrapper, { paddingTop: isTyping ? 10 : 20 }]}
          >
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
              numberOfLines={3}
              onChangeText={handleInputChange}
              onFocus={() => setIsTyping(true)}
              // onBlur={() => setIsTyping(false)}
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
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    position: "relative",
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
  inputComponents: {
    backgroundColor: "white",
    justifyContent: "space-evenly",
    // Add shadow properties
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  // writeTextWrapper: {
  //     backgroundColor: "white",
  //     justifyContent: "space-evenly",
  // },
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
