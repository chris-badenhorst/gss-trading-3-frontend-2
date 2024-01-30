// src/redux/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  form: 1,
  assessmentDate: "",
  responsibleEmployee: "",
  surveyNumber: "",
  presentOnSite: [],
  premisesOccupiedOrVacant: "",
  surveyItems: [],
  comment: "",
  model: "",
  type: "",
  loading: false,
  response: null,
  error: null,
  other: [],
};

export const addSurvey = createAsyncThunk("addSurvey", async (formData) => {
  try {
    // Get the access token from the state
    const accessToken = localStorage.getItem("accessToken");

    // Set the headers with the access token
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make the API request with the access token included in the headers
    const response = await axios.post("http://127.0.0.1:8000/", formData, {
      headers,
    });

    return response.data; // You might want to return something from the response
  } catch (error) {
    throw error;
  }
});
export const getSurveys = createAsyncThunk("getSurveys", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Set the headers with the access token
    const headers = {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    };
    const response = await axios.get("http://127.0.0.1:8000/get/", { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteSurvey = createAsyncThunk("deleteSurveys", async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const accessToken = localStorage.getItem("accessToken");

    // Set the headers with the access token
    const headers = {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
    };
    const response = await axios.delete(`http://127.0.0.1:8000/delete/${id}/`, {
      headers,
    });
  } catch (error) {
    throw error;
  }
});

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    nextForm: (state) => {
      state.form = state.form + 1;
    },
    previousForm: (state) => {
      state.form = state.form - 1;
    },
    updateFormData: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addPresentOnSite: (state, action) => {
      const { value } = action.payload;
      state.presentOnSite.push(value);
    },
    addSurveyItem: (state, action) => {
      const formData = action.payload;
      state.surveyItems.push(formData);
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
    addOther: (state, action) => {
      const value = action.payload;
      state.other.push(value);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveys.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSurveys.fulfilled, (state, action) => {
        state.loading = false;
        state.objects = true;
        state.response = action.payload;
      })
      .addCase(getSurveys.rejected, (state, action) => {
        state.loading = false;
        state.objects = false;
        state.error = action.error.message;
      });
  },
});

export const selectAssessmentDate = (state) => state.form.assessmentDate;
export const selectResponsibleEmployee = (state) =>
  state.form.responsibleEmployee;
export const selectPresentOnSite = (state) => state.form.presentOnSite;
export const selectPremisesOccupiedOrVacant = (state) =>
  state.form.premisesOccupiedOrVacant;
export const selectItems = (state) => state.form.surveyItems;
export const selectComment = (state) => state.form.comment;
export const selectModel = (state) => state.form.model;
export const selectMake = (state) => state.form.make;
export const selectLoading = (state) => state.form.loading;
export const selectObjects = (state) => state.form.objects;
export const selectError = (state) => state.form.error;
export const selectResponse = (state) => state.form.response;
export const selectOther = (state) => state.form.other;
export const selectSurveyNumber = (state) => state.form.surveyNumber;
export const selectDeleteSurvey = (state) => state.form.deleteSurvey;
export const {
  nextForm,
  previousForm,
  updateFormData,
  addPresentOnSite,
  addSurveyItem,
  reset,
  addOther,
} = formSlice.actions;

export default formSlice.reducer;
