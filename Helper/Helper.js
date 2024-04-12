import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

export const loadTaskItems = async (setTaskItems) => {
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

export const saveTaskItems = async (taskItems) => {
  try {
    await AsyncStorage.setItem("taskItems", JSON.stringify(taskItems));
  } catch (error) {
    alert("Error saving task items:", error);
    console.error("Error saving task items:", error);
  }
};

export const deleteTask = (taskItems, setTaskItems, index) => {
  const itemsCopy = [...taskItems];
  itemsCopy.splice(index, 1);
  setTaskItems(itemsCopy);
};

// const validateLogin()

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");
