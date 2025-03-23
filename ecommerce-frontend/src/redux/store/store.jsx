import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/counter/counterSlice";
import userReducer from "../reducer/userReducer";
import teamReducer from "../reducer/teamReducer";
import taskReducer from "../reducer/taskReducer";
import productReducer from "../reducer/productReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    task: taskReducer,
    product: productReducer,
  },
});
