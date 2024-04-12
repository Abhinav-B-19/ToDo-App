import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastname: null,
    userName: null,
    email: null,
    passWord: null,
    confirmPassword: null,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setUserLastName: (state, action) => {
      state.lastname = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action) => {
      state.passWord = action.payload;
    },
    setUserConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    //Continue for other variables
  },
});

export const {
  setUserName,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
  setUserConfirmPassword,
} = userSlice.actions;

export default userSlice.reducer;
