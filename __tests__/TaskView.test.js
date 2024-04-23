import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskView from "../components/TaskView";

describe("TaskView", () => {
  it("expands to show additional content when View is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <TaskView
        text="Sample Task"
        completed={false}
        startDate={new Date()}
        description="Sample description"
        dueDate="2024-04-25"
        priority="High"
      />
    );

    // Initially, additional content should not be visible
    expect(queryByTestId("startDate")).toBeFalsy();
    expect(queryByTestId("descriptionText")).toBeFalsy();
    expect(queryByTestId("dueDateText")).toBeFalsy();
    expect(queryByTestId("priorityText")).toBeFalsy();

    fireEvent.press(getByTestId("touchable"));

    // Check if the additional content is now visible
    expect(getByTestId("startDate")).toBeTruthy();
    expect(getByTestId("descriptionText")).toBeTruthy();
    expect(getByTestId("dueDateText")).toBeTruthy();
    expect(getByTestId("priorityText")).toBeTruthy();
  });

  it("toggles checkbox when pressed", async () => {
    //=========== How to do it ====================
    // const { getByTestId, findByRole } = render(
    //   <TaskView
    //     completed={false}
    //     text="Sample Task"
    //     startDate={new Date()}
    //     description="Sample description"
    //     dueDate="2024-04-25"
    //     priority="High"
    //   />
    // );
    // // const checkbox = getByTestId("taskCheckbox");
    // // fireEvent.press(checkbox);
    // const checkbox = await findByRole("checkbox");
    // fireEvent(checkbox, "onValueChange", true);
    // const updatedCheckbox = getByTestId("taskCheckbox");
    // const isChecked = updatedCheckbox.props.accessibilityState.checked;
    // expect(isChecked).toBe(true);
  });
});
