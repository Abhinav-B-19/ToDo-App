const updateTodoApi = async (todoData) => {
  try {
    // Fetch todo data from the endpoint
    const response = await fetch("http://localhost:3000/todos");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    // Parse the response as JSON
    let todos = await response.json();

    console.log("\ntodos: ", todos, "\n\ntodoData: ", todoData);
    // Find the index of the todo item with matching ID
    const index = todos.findIndex((todo) => todo.taskId === todoData[0].taskId);

    // If a matching todo is found, replace it with the new todoData
    if (index !== -1) {
      todos[index] = todoData[0];
    } else {
      console.log("Todo not found.");
      return null;
    }

    // Send a PUT request to update the todos on the server
    const updateResponse = await fetch(
      `http://localhost:3000/todos/${todos[index].taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData[0]), // Send only the updated todo
      }
    );

    // Check if the update was successful
    if (updateResponse.ok) {
      console.log("Todo updated successfully.");
      return { status: 200, data: todoData[0] };
    } else {
      console.error("Failed to update todo:", updateResponse.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
};

export default updateTodoApi;
