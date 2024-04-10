import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTaskManager = () => {
  const [taskItems, setTaskItems] = useState([]);
  const [editedTask, setEditedTask] = useState("");

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
      console.error("Error loading task items:", error);
    }
  };

  const saveTaskItems = async () => {
    try {
      await AsyncStorage.setItem("taskItems", JSON.stringify(taskItems));
    } catch (error) {
      console.error("Error saving task items:", error);
    }
  };

  const addTask = (task) => {
    setTaskItems([{ text: task, completed: false }, ...taskItems]);
  };

  const updateTask = (task) => {
    const updatedTasks = taskItems.map((item) => {
      if (item.text === editedTask) {
        return { ...item, text: task };
      }
      return item;
    });
    setTaskItems(updatedTasks);
    setEditedTask("");
  };

  const deleteTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const completeTask = (clickedTask) => {
    const updatedTaskItems = taskItems.map((item) => {
      if (item.text === clickedTask.text) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTaskItems(updatedTaskItems);
  };

  //   const editTask = (task) => {
  //     console.log(task.text);
  //     setEditedTask(task.text);
  //   };

  return {
    taskItems,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    // editTask,
  };
};

export default useTaskManager;
