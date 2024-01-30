import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("gsstradingUserInfo")) || {
    name: "",
    email: "",
    quote: false,
    survey: false,
    is_staff: false,
  };
  return userInfo;
};

const getAccessToken = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken")) || "";
  return accessToken;
};

const initialState = {
  userInfo: getUserInfo(),
  loading: false,
  error: null,
  access: getAccessToken(),
};

export const login = createAsyncThunk("login", async (data) => {
  const { email, password } = data;
  try {
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });
    const decoded = jwtDecode(response.data.access);
    console.log(decoded);
    const id = decoded.user_id;
    const userInfo = await axios.get(`/get-user/${id}`);
    localStorage.setItem("gsstradingUserInfo", JSON.stringify(userInfo.data));
    return response.data; // Return entire response object
  } catch (error) {
    return error.response.data; // Return error response data
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when login is pending
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error; // Set error if present in payload
        }
        try {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.access)
          ); // Store access token in localStorage
          console.log(action.payload.access);
          state.initialState = {
            userInfo: getUserInfo(),
            loading: false,
            error: null,
            access: getAccessToken(),
          };
        } catch (error) {
          console.error("Error storing access token:", error);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred"; // Set a default error message
      });
  },
});

export const selectName = (state) => state.user.userInfo.name;
export const selectEmail = (state) => state.user.userInfo.email;
export const selectQuote = (state) => state.user.userInfo.quote;
export const selectSurvey = (state) => state.user.userInfo.survey;
export const selectStaff = (state) => state.user.userInfo.is_staff;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
