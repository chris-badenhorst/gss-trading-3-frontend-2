import { configureStore } from "@reduxjs/toolkit";
import formSliceReducer from "../features/FormSlice";
import userSliceReducer from "../features/UserSlice";

const store = configureStore({
  reducer: {
    form: formSliceReducer,
    user: userSliceReducer,
  },
});

export default store;
