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
import deleteTodoApi from "../api/deleteTodoApi";
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
import MySelectList from "../components/MySelectList";

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

  // const [isSortVisible, setIsSortVisible] = useState(false);
  // const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSelectListVisible, setIsSelectListVisible] = useState(false);
  const [selectListOptions, setSelectListOptions] = useState([]);

  const [originalTaskItems, setOriginalTaskItems] = useState([]);

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
  }, []);

  useEffect(() => {
    setOriginalTaskItems([...taskItems]); // Update originalTaskItems whenever taskItems changes
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
        dueDate: selectedDate ? selectedDate.toLocaleString() : null,
        priority: selectedPriority,
        description: description,
        important: isImportant,
      };

      console.log("updatedTaskItem: ", updatedTaskItem);
      try {
        const response = await updateTodoApi([updatedTaskItem]);
        if (response && (response.status === 200 || response.status === 201)) {
          console.log("Todo updated successfully:", response.data);
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

    setEditedTask("");
    setTask("");
    setIsTyping(false);
    inputRef.current.blur();
  };

  const deleteTask = async (index) => {
    // Make the function async to handle the asynchronous delete API call
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
          onPress: async () => {
            // Call the deleteTodoApi function asynchronously
            try {
              // Call the deleteTodoApi function and pass the necessary data
              const response = await deleteTodoApi(
                taskItems[index].userId,
                taskItems[index].taskId
              );
              if (
                response &&
                (response.status === 200 || response.status === 204)
              ) {
                setApiData();
              } else {
                console.error(
                  "Failed to delete task:",
                  response ? response.status : "Unknown error"
                );
              }
            } catch (error) {
              console.error("Error deleting task:", error);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAll = async () => {
    // Make the function async to handle the asynchronous delete API call
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all the tasks?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Call the deleteTodoApi function asynchronously
            try {
              // Call the deleteTodoApi function and pass the necessary data
              const response = await deleteTodoApi(userId);
              if (
                response &&
                (response.status === 200 || response.status === 204)
              ) {
                setApiData();
              } else {
                console.error(
                  "Failed to delete task:",
                  response ? response.status : "Unknown error"
                );
              }
            } catch (error) {
              console.error("Error deleting task:", error);
            }
          },
        },
      ]
    );
  };

  const handleEditTask = (todo) => {
    setIsTyping(true);
    setDescription(todo.description); // Set the description state value
    setSelectedPriority(todo.priority); // Set the priority state value
    setEditedTask(todo.taskId);
    setTask(todo.task);
    // setDescription(todo.description); // Pass the description to the DraggableBottomSheet
    // setSelectedPriority(todo.priority); // Assuming you also want to pass the priority
    // setSelectedDate(todo.dueDate); // Pass the dueDate to the DraggableBottomSheet
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
    setTask("");
    setEditedTask("");
    setIsImportant(false);
    setSelectedPriority("Low");
    setSelectedDate(null);
    setDescription("");
  };

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

  // const handleSelectOption = (option) => {
  //   // Handle sorting or filtering based on the selected option
  //   switch (option) {
  //     case "sort":
  //       handleSort(); // Call your sorting function
  //       break;
  //     case "filter":
  //       handleFilter(); // Call your filtering function
  //       break;
  //     default:
  //       break;
  //   }
  //   setIsPopoverVisible(false); // Hide the popover after selecting an option
  // };

  const handleSortNew = (option) => {
    if (!isSelectListVisible) {
      setTaskItems([...originalTaskItems]); // Reset task items to originalTaskItems when isSelectListVisible is false
      return;
    }
    if (!taskItems) {
      console.error("Task items are undefined");
      return;
    }
    let sortedItems = [...taskItems];
    console.log(sortedItems);
    switch (option) {
      case "Sort by Due Date":
        console.log("Sorting by Due Date in handleSortNew");
        sortedItems.sort((a, b) => {
          if (!a.dueDate) return 1; // Move items without a due date to the end
          if (!b.dueDate) return -1; // Move items without a due date to the end
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case "Sort by Priority":
        console.log("Sorting by Priority in handleSortNew");
        sortedItems.sort((a, b) => {
          const priorityOrder = ["Low", "Medium", "High"]; // Define priority order from high to low
          return (
            priorityOrder.indexOf(b.priority) -
            priorityOrder.indexOf(a.priority)
          );
        });
        break;
      case "Sort by Completed":
        console.log("Sorting by Completed in handleSortNew");
        sortedItems.sort((a, b) => {
          // If both items have the same completion status, sort them based on other criteria
          if (a.completed === b.completed) {
            // Add additional sorting criteria here if needed
            return 0;
          }

          // If a's completed status is true, it should appear before b
          // If a's completed status is false, it should appear after b
          return a.completed ? -1 : 1;
        });
        break;
      default:
        sortedItems.sort((a, b) => a.task.localeCompare(b.task));
        break;
    }
    setTaskItems(sortedItems);
  };

  const handleFilterNew = (option) => {
    if (!isSelectListVisible) {
      setTaskItems([...originalTaskItems]); // Reset task items to originalTaskItems when isSelectListVisible is false
      return;
    }
    let filteredItems = [...taskItems];
    switch (option) {
      case "Filter by Important":
        console.log("Filtering by Important in handleFilterNew");
        filteredItems = filteredItems.filter((item) => item.important);
        break;
      case "Filter by Completed":
        console.log("Filtering by Completed in handleFilterNew");
        filteredItems = filteredItems.filter((item) => item.completed);
        break;
      default:
        break;
    }
    setTaskItems(filteredItems);
  };

  const handleToggleSelectList = (options) => {
    setIsSelectListVisible(!isSelectListVisible);
    // Update the selectListOptions state with the options to display
    setSelectListOptions(options);
    if (!isSelectListVisible) {
      setTaskItems([...originalTaskItems]); // Reset task items to originalTaskItems when isSelectListVisible is false
      return;
    }
  };

  const handleSelectOption = (option) => {
    // Handle sorting or filtering based on the selected option
    switch (option) {
      case "Sort by Due Date":
        handleSortNew(option);
        break;
      case "Sort by Priority":
        handleSortNew(option);
        break;
      case "Sort by Completed":
        handleSortNew(option);
        break;
      case "Filter by Important":
        handleFilterNew(option);
        break;
      case "Filter by Completed":
        handleFilterNew(option);
        break;
      default:
        break;
    }
    // Hide the select list after selecting an option
    // setIsSelectListVisible(false);
  };

  return (
    <>
      <View style={styles.topIconsContainer}>
        {/* <TouchableOpacity onPress={() => handleSort("priority")}>
          <MaterialCommunityIcons name="sort" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFilter("completed")}>
          <MaterialCommunityIcons name="filter" size={24} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() =>
            handleToggleSelectList([
              "Sort by Due Date",
              "Sort by Priority",
              "Sort by Completed",
            ])
          }
        >
          <MaterialCommunityIcons name="sort" size={24} color="black" />
        </TouchableOpacity>

        {/* Render the select list only if it's visible */}
        {isSelectListVisible && (
          <MySelectList
            options={selectListOptions}
            onSelectOption={(option) => handleSelectOption(option)}
          />
        )}
        <TouchableOpacity
          onPress={() =>
            handleToggleSelectList([
              "Filter by Important",
              "Filter by Completed",
            ])
          }
        >
          <MaterialCommunityIcons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
                    onExpandView={() => handleExpandView(item)}
                    changeImportant={() => changeImportant(item.taskId)}
                    text={item.task}
                    description={item.description}
                    dueDate={item.dueDate}
                    startDate={item.startDate}
                    priority={item.priority}
                    completed={item.completed}
                    important={item.important}
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
              description={description}
            />
          )}
          <View style={styles.inputComponents}>
            {isTyping && (
              <HorizontalScrollView onSelectDate={handleDateSelect} />
            )}
            <View
              style={[styles.inputWrapper, { paddingTop: isTyping ? 10 : 20 }]}
            >
              {/* Delete All Icon */}

              {!isTyping && (
                <>
                  <TouchableOpacity onPress={handleDeleteAll}>
                    <View style={styles.deleteAllWrapper}>
                      <MaterialCommunityIcons
                        name="delete-sweep"
                        size={24}
                        color="red"
                      />
                    </View>
                  </TouchableOpacity>
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
                </>
              )}

              <TextInput
                ref={inputRef}
                style={styles.inputField}
                placeholder={"I Want To ..."}
                value={task}
                numberOfLines={3}
                onChangeText={handleInputChange}
                onFocus={() => setIsTyping(true)}
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
    </>
  );
};

const styles = StyleSheet.create({
  topIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
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
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C0C0C0",
    // borderWidth: 1,
    // marginRight: 10,
  },
  deleteAllWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C0C0C0",
    // borderWidth: 1,
    marginLeft: 10, // Add some margin for spacing
  },
  inputField: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "75%",
    marginLeft: 10,
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
