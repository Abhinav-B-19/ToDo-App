import { BASE_URL } from "../constants";
const deleteTodoApi = async (userId = null, taskId = null) => {
  console.log("taskId: ", taskId, "userId: ", userId);
  try {
    // If both taskId and userId are provided, delete a single task
    if (taskId && userId) {
      const deleteResponse = await fetch(`${BASE_URL}/todos/${taskId}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        console.log("Task deleted successfully.");
        return { status: 200 };
      } else {
        console.error("Failed to delete task:", deleteResponse.statusText);
        return null;
      }
    }

    // If only userId is provided, delete all tasks for the user
    if (userId) {
      //   const deleteResponse = await fetch(
      //     `http://localhost:3000/todos?userId=${userId}`,
      //     {
      //       method: "DELETE",
      //     }
      //   );

      //   if (deleteResponse.ok) {
      //     console.log("All tasks deleted successfully.");
      //     return { status: 200 };
      //   } else {
      //     console.error("Failed to delete tasks:", deleteResponse.statusText);
      //     return null;
      //   }
      try {
        const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
        const tasks = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const deleteRequests = tasks.map(async (task) => {
          const deleteResponse = await fetch(`${BASE_URL}/todos/${task.id}`, {
            method: "DELETE",
          });

          if (!deleteResponse.ok) {
            throw new Error(
              `Failed to delete task: ${deleteResponse.statusText}`
            );
          }
        });

        await Promise.all(deleteRequests);

        console.log("All tasks deleted successfully.");
        return { status: 200 };
      } catch (error) {
        console.error("Error deleting tasks:", error.message);
        return null;
      }
    }

    // If neither taskId nor userId is provided, return null
    console.error(
      "Both taskId and userId are required for deleting a single task."
    );
    return null;
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};

export default deleteTodoApi;
