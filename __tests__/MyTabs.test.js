import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyTabs from "../components/MyTabs";

describe("MyTabs tests", () => {
  it("should navigate to MyDay screen when My Day tab is pressed", () => {
    // Mock navigation object
    const navigation = {
      navigate: jest.fn(),
    };

    // Render the MyTabs component
    const { getByText } = render(<MyTabs navigation={navigation} />);

    // Find and press the "My Day" tab
    fireEvent.press(getByText("My Day"));

    // Check if navigation to the "MyDay" screen occurred
    expect(navigation.navigate).toHaveBeenCalledWith("ToDoPage");
  });
});
