import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../Screens/LoginScreen";

describe("<LoginScreen />", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText("Logo")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("LOGIN")).toBeTruthy();
    expect(getByText("Remember me")).toBeTruthy();
    expect(getByText("New user?")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
  });
});
