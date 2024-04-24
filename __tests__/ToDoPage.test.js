import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ToDoPage from "../Screens/TodoPage";
import { useAppDispatch, useAppSelector } from "../Redux/redux-hooks";
import { testUseAppSelector } from "../Redux/test-app-selector";

jest.mock("../Redux/redux-hooks");

describe("ToDoPage tests", () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
  });
  it("renders ToDoPage correctly", () => {
    const { getByTestId } = render(<ToDoPage />);
    const todoPage = getByTestId("todo-page");
    expect(todoPage).toBeTruthy();
  });

  it("adds a task when user input is provided", async () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <ToDoPage />
    );

    // Get the input field
    const input = getByPlaceholderText("I Want To ...");

    // Press the input field and change text
    fireEvent.press(input);
    fireEvent.changeText(input, "New task");

    // Press the add button
    fireEvent.press(getByText("+"));

    // Check if the input field containing "New task" exists
    const newTaskInput = queryByText("New task");

    // If the input field exists, it means the task has been added
    await waitFor(() => {
      expect(newTaskInput).toBeTruthy();
    });
  });

  //   it("deletes all tasks when delete all button is pressed", () => {
  //     // const { getByTestId, queryByText } = render(<ToDoPage />);
  //     // const deleteAllButton = getByTestId("delete-all-button");
  //     // fireEvent.press(deleteAllButton);
  //     // const noTasksMessage = queryByText("No tasks available.");
  //     // expect(noTasksMessage).toBeTruthy();
  //   });

  //   it("toggles completion status when a task is pressed", () => {
  //     // const { getByText } = render(<ToDoPage />);
  //     // const taskItem = getByText("Example Task"); // Assuming there is a task with this text
  //     // fireEvent.press(taskItem);
  //     // expect(taskItem).toHaveStyle({ textDecorationLine: "line-through" });
  //   });

  //   it("edits a task when edit button is pressed", () => {
  //     // const { getByText, getByPlaceholderText } = render(<ToDoPage />);
  //     // const editButton = getByText("Edit"); // Assuming there is an edit button with this text
  //     // fireEvent.press(editButton);
  //     // const updatedTaskInput = getByPlaceholderText("I Want To ...");
  //     // fireEvent.changeText(updatedTaskInput, "Updated task");
  //     // fireEvent.press(getByText("Save"));
  //     // const updatedTask = getByText("Updated task");
  //     // expect(updatedTask).toBeTruthy();
  //   });

  //   it("changes task importance when important icon is pressed", () => {
  //     // const { getByTestId } = render(<ToDoPage />);
  //     // const importantIcon = getByTestId("important-icon"); // Assuming there is an important icon with this test ID
  //     // fireEvent.press(importantIcon);
  //     // expect(importantIcon).toHaveStyle({ color: "red" });
  //   });

  //   it("filters tasks by importance when 'Filter by Important' option is selected", () => {
  //     // const { getByText, getByTestId, queryByText } = render(<ToDoPage />);
  //     // const filterButton = getByTestId("filter-button");
  //     // fireEvent.press(filterButton);
  //     // const filterOption = getByText("Filter by Important");
  //     // fireEvent.press(filterOption);
  //     // const importantTask = queryByText("Important Task"); // Assuming there is an important task with this text
  //     // expect(importantTask).toBeTruthy();
  //   });

  //   it("sorts tasks by due date when 'Sort by Due Date' option is selected", () => {
  //     // const { getByText, getByTestId } = render(<ToDoPage />);
  //     // const sortButton = getByTestId("sort-button");
  //     // fireEvent.press(sortButton);
  //     // const sortOption = getByText("Sort by Due Date");
  //     // fireEvent.press(sortOption);
  //     // const sortedTask = getByText("Due Soon Task"); // Assuming there is a task due soon with this text
  //     // expect(sortedTask).toBeTruthy();
  //   });
});
