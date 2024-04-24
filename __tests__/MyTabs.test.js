import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { act } from "react-test-renderer";
import "@testing-library/jest-native/extend-expect";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "../components/MyTabs";
import { useAppDispatch, useAppSelector } from "../Redux/redux-hooks";
import { testUseAppSelector } from "../Redux/test-app-selector";

const navigation = {
  navigate: jest.fn(),
};

jest.mock("../Redux/redux-hooks");

describe("MyTabs tests", () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(testUseAppSelector);
  });

  it("should navigate to Home screen when Home tab is pressed", async () => {
    render(
      <NavigationContainer>
        <MyTabs navigation={navigation} />
      </NavigationContainer>
    );
    await act(async () => {
      const homeTab = screen.getByRole("button", { name: "Home" });
      fireEvent.press(homeTab);

      await waitFor(() => {
        expect(screen.getByText("Welcome to Home Screen!")).toBeOnTheScreen();
      });
    });
  });

  it("should navigate to Updates screen when Updates tab is pressed", async () => {
    render(
      <NavigationContainer>
        <MyTabs navigation={navigation} />
      </NavigationContainer>
    );
    await act(async () => {
      const updatesTab = screen.getByRole("button", { name: "Updates" });
      fireEvent.press(updatesTab);

      await waitFor(() => {
        expect(screen.getByText("Notifications!")).toBeOnTheScreen();
      });
    });
  });

  it("should navigate to Profile screen when Profile tab is pressed", async () => {
    render(
      <NavigationContainer>
        <MyTabs navigation={navigation} />
      </NavigationContainer>
    );
    await act(async () => {
      const profileTab = screen.getByRole("button", { name: "Profile" });
      fireEvent.press(profileTab);

      await waitFor(() => {
        expect(screen.getByText("Profile!")).toBeOnTheScreen();
      });
    });
  });
  // it("should navigate to MyDay screen when My Day tab is pressed", async () => {
  //   // Render the MyTabs component within a NavigationContainer
  //   const { getByText } = render(
  //     <NavigationContainer>
  //       <MyTabs navigation={navigation} />
  //     </NavigationContainer>
  //   );

  //   // Find and press the "My Day" tab
  //   fireEvent.press(getByText("My Day"));

  //   // Check if navigation to the "MyDay" screen occurred
  //   await waitFor(() => {
  //     expect(navigation.navigate).toHaveBeenCalledWith("ToDoPage");
  //   });
  // });
});
