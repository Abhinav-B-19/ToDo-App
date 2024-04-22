import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignUpPage from "../Screens/SignUpPage";

describe("<SignUpPage />", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SignUpPage />);
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByText("Already a user?")).toBeTruthy();
    expect(getByText("Login in")).toBeTruthy();
  });
});
