import { render, fireEvent } from "@testing-library/react-native";
import SignUpPage from "../Screens/SignUpPage";
import { useAppDispatch, useAppSelector } from "../Redux/redux-hooks";
import { testUseAppSelector } from "../Redux/test-app-selector";

jest.mock("../Redux/redux-hooks");

describe("<SignUpPage />", () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
  });
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SignUpPage />);
    // expect(getByText("Sign Up")).toBeTruthy();
    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByText("Already a user?")).toBeTruthy();
    expect(getByText("Login in")).toBeTruthy();
  });

  it("handles form input correctly", () => {
    const { getByPlaceholderText } = render(<SignUpPage />);
    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");

    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");
    fireEvent.changeText(emailInput, "john.doe@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");

    expect(firstNameInput.props.value).toBe("John");
    expect(lastNameInput.props.value).toBe("Doe");
    expect(emailInput.props.value).toBe("john.doe@example.com");
    expect(passwordInput.props.value).toBe("password123");
    expect(confirmPasswordInput.props.value).toBe("password123");
  });
});
