const addTodoApi = async (userId, todoData) => {
  try {
    // Set the userId in the todoData
    todoData.userId = userId;

    // Fetch user data
    const checkResponse = await fetch(
      `http://localhost:3000/signup?id=${userId}`
    );
    const userData = await checkResponse.json();

    // Find the user with the matching userId
    const user = userData.find((user) => user.id === userId);

    // Add new todo
    if (user) {
      // Generate taskId using userId and the length of the todos array
      const taskId = `${userId}${user.todos.length}`;
      // Assign the taskId to todoData
      todoData.taskId = taskId;
      // Push todoData to user's todos array
      user.todos.push(todoData);
    } else {
      console.error(`User with userId ${userId} not found.`);
      return { status: 404, data: null };
    }

    // Send a PUT or PATCH request to update the user's data on the server
    const updateResponse = await fetch(
      `http://localhost:3000/signup/${userId}`,
      {
        method: "PUT", // Use PUT or PATCH depending on your API's requirements
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    // Check if the update was successful
    if (updateResponse.ok) {
      // Return the updated data
      const updatedUser = await updateResponse.json();
      return { status: updateResponse.status, data: updatedUser };
    } else {
      // Handle error if the update fails
      console.error("Failed to update user:", updateResponse.statusText);
      return { status: updateResponse.status, data: null };
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    return { status: -1, data: null };
  }
};

export default addTodoApi;
