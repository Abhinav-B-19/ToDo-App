import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import userSlice from "../Slices/userSlice";

// use persist for life long storage
export default store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    user: userSlice,
  }),
});
