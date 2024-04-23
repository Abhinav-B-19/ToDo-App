import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../Screens/LoginScreen";
import { useAppDispatch, useAppSelector } from "../Redux/redux-hooks";
import { testUseAppSelector } from "../Redux/test-app-selector";

jest.mock("../Redux/redux-hooks");

describe("<LoginScreen />", () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
  });
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText("Logo")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("LOGIN")).toBeTruthy();
    expect(getByText("Remember me")).toBeTruthy();
    expect(getByText("New user?")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
  });

  it("handles email and password input correctly", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Expect the state values of email and password to be updated
    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  test("handles remember me checkbox correctly", async () => {
    ///How to do it
  });
});
