import { configureStore } from "@reduxjs/toolkit";
import formSliceReducer from "../features/FormSlice";

const store = configureStore({
  reducer: {
    form: formSliceReducer,
  },
});

export default store;
