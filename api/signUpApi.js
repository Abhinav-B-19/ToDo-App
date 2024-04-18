const signUpApi = async (userData) => {
  try {
    // Check if user with the same email already exists
    const checkResponse = await fetch(
      `http://localhost:3000/signup?email=${userData.email}`
    );
    const checkData = await checkResponse.json();

    if (checkData.length > 0) {
      // User with the same email already exists
      return { status: 409, data: null };
    }

    userData.todos = [];
    // User does not exist, proceed with sign-up
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error("Error signing up:", error);
    return { status: -1, data: null };
  }
};

export default signUpApi;
