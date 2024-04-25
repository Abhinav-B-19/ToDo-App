import { BASE_URL } from "../constants";
const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      if (data[0].email === email && data[0].password === password) {
        return { status: 200, message: "User found", data: data[0] };
      } else {
        return { status: 404, message: "User not found or password mismatch" };
      }
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { status: -1, message: "No Such User" };
  }
};

export default loginApi;
