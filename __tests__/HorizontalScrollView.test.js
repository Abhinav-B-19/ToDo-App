import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HorizontalScrollView from "../components/HorizontalScrollView";
import { act } from "react-test-renderer";

describe("HorizontalScrollView", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <HorizontalScrollView onSelectDate={() => {}} />
    );

    expect(getByText("This Evening")).toBeTruthy();
    expect(getByText("Tomorrow Morning")).toBeTruthy();
    expect(getByText("Next Week")).toBeTruthy();
    expect(getByText("Someday")).toBeTruthy();
    expect(getByText("Custom")).toBeTruthy();
  });

  it("handles option select correctly", async () => {
    const onSelectDateMock = jest.fn();
    const { getByText } = render(
      <HorizontalScrollView onSelectDate={onSelectDateMock} />
    );
    act(async () => {
      const tomorrowMorningButton = getByText("Tomorrow Morning");

      fireEvent.press(tomorrowMorningButton);

      await waitFor(() => {
        expect(onSelectDateMock).toHaveBeenCalledWith(
          expect.any(Date),
          "Tomorrow Morning"
        );
      });
    });
  });

  it("shows date picker when 'Custom' option is selected", async () => {
    const { getByText, getByTestId } = render(
      <HorizontalScrollView onSelectDate={() => {}} />
    );

    // Simulate pressing on the 'Custom' option
    const customButton = getByText("Custom");

    // Wrap the state update in act(...)
    act(() => {
      fireEvent.press(customButton);
    });

    // Assert that the date picker is visible
    const datePicker = getByTestId("dateTimePicker");
    await waitFor(() => {
      expect(datePicker).toBeTruthy();
    });
  });
});
