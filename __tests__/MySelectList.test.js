import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MySelectList from "../components/MySelectList";

describe("MySelectList tests", () => {
  it("calls onSelectOption when an option is clicked", async () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const onSelectOption = jest.fn();
    const { getByText, getByTestId } = render(
      <MySelectList options={options} onSelectOption={onSelectOption} />
    );

    // Click to open the SelectList options
    fireEvent.press(getByText("Select option"));

    // Click on an option
    fireEvent.press(getByText("Option 1"));

    // Assert that onSelectOption function is called with the correct option
    expect(onSelectOption).toHaveBeenCalledWith("Option 1");
  });
});
