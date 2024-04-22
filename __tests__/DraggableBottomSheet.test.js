import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DraggableBottomSheet from "../components/DraggableBottomSheet";

describe("DraggableBottomSheet", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <DraggableBottomSheet />
    );

    // Assert that important elements are rendered
    expect(getByPlaceholderText("Enter description...")).toBeTruthy();
    expect(getByText("Remaining characters: 250")).toBeTruthy(); // Assuming initial remaining characters is 250
    expect(getByText("Low")).toBeTruthy();
    expect(getByText("Moderate")).toBeTruthy();
    expect(getByText("High")).toBeTruthy();
  });

  it("handles description change correctly", () => {
    const setDescriptionMock = jest.fn();
    const { getByPlaceholderText } = render(
      <DraggableBottomSheet setDescription={setDescriptionMock} />
    );

    // Simulate typing in description input
    const descriptionInput = getByPlaceholderText("Enter description...");
    fireEvent.changeText(descriptionInput, "Test description");

    // Assert that setDescription function is called with the correct value
    expect(setDescriptionMock).toHaveBeenCalledWith("Test description");
  });

  it("handles priority change correctly", () => {
    const setSelectedPriorityMock = jest.fn();
    const { getByText } = render(
      <DraggableBottomSheet setSelectedPriority={setSelectedPriorityMock} />
    );

    // Simulate pressing on a priority button
    const moderatePriorityButton = getByText("Moderate");
    fireEvent.press(moderatePriorityButton);

    // Assert that setSelectedPriority function is called with the correct value
    expect(setSelectedPriorityMock).toHaveBeenCalledWith("Moderate");
  });
});
