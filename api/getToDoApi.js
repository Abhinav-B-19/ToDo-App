import { BASE_URL } from "../constants";
const getToDoApi = async (userId) => {
  try {
    // Construct the URLs dynamically
    const userUrl = `${BASE_URL}/users/${userId}`;
    const todoUrl = `${BASE_URL}/todos`;

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

    // Parse response bodies as JSON
    const userData = await userDataRes.json();
    const todoData = await todoDataRes.json();

    // Filter todos based on userId
    const userTodos = todoData.filter((todo) => todo.userId === userId);

    // Return user data along with filtered todos
    const data = {
      ...userData,
      todos: userTodos,
    };

    // Return the data with status 200
    return { status: 200, data };
  } catch (error) {
    console.error("Error fetching todos:", error);
    // Return error status and message
    return { status: -1, error: error.message };
  }
};

export default getToDoApi;
