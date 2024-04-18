const getToDoApi = async (userId) => {
  try {
    // Construct the URL dynamically with the user's ID
    const apiUrl = `http://localhost:3000/signup/${userId}`;

    // Fetch todos for the respective user
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.statusText}`);
    }

    // Parse response body as JSON
    const data = await res.json();

    // Return the data with status 200
    return { status: 200, data };
  } catch (error) {
    console.error("Error fetching todos:", error);
    // Return error status and message
    return { status: -1, error: error.message };
  }
};

export default getToDoApi;
