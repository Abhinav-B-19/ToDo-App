import React from "react";
import { render } from "@testing-library/react-native";
import Fallback from "../components/Fallback";

describe("Fallback screen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Fallback />);
    const textElement = getByText("Add your To-Do list here");
    expect(textElement).toBeTruthy();
  });
});
