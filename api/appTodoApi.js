const addTodoApi = async (userId, todoData) => {
  try {
    // Set the userId in the todoData
    todoData.userId = userId;

    const userUrl = `http://localhost:3000/users/${userId}`;
    const todoUrl = "http://localhost:3000/todos";

    // Fetch data from both endpoints
    const [userDataRes, todoDataRes] = await Promise.all([
      fetch(userUrl),
      fetch(todoUrl),
    ]);

    // Check if both requests are successful
    if (!userDataRes.ok) {
      throw new Error(`Failed to fetch user data: ${userDataRes.statusText}`);
    }
    if (!todoDataRes.ok) {
      throw new Error(`Failed to fetch todo data: ${todoDataRes.statusText}`);
    }

    // Parse response data
    const userData = await userDataRes.json();
    const todoDataJson = await todoDataRes.json();

    // Check if todoDataJson is an array
    if (!Array.isArray(todoDataJson)) {
      throw new Error("Todo data is not an array");
    }

    // Get the index of the new todo in the user's todos array
    const index = todoDataJson.length;

    // Generate taskId using userId and the index of the new todo
    const taskId = `${userId}${index}`;

    // Assign the taskId to todoData
    todoData.id = taskId;
    todoData.taskId = taskId;

    // Send a POST request to create a new todo
    const createResponse = await fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    // Check if the creation was successful
    if (!createResponse.ok) {
      throw new Error(`Failed to create todo: ${createResponse.statusText}`);
    }

    // Return the created todo
    const createdTodo = await createResponse.json();
    return { status: createResponse.status, data: createdTodo };
  } catch (error) {
    console.error("Error adding todo:", error);
    return { status: -1, data: null, error: error.message };
  }
};

export default addTodoApi;
