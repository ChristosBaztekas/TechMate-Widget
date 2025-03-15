import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatClosed: true,
  formSubmitted: false,
  notification: false,
  isWidgetClosed: false,
  theme: "purple",
  identifier: null,
};

const userInteractionsSlice = createSlice({
  name: "userInteractions",
  initialState,
  reducers: {
    setChatState: (state, action) => {
      state.isChatClosed = action.payload;
    },
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setNotificationState: (state, action) => {
      state.notification = action.payload;
    },
    setWidgetState: (state, action) => {
      state.isWidgetClosed = action.payload;
    },
    setTheme: (state, action) => {
      const selectedTheme = action.payload;
      state.theme = selectedTheme;
    },
    setIdentifier: (state, action) => {
      state.identifier = action.payload;
    },
  },
});

export const {
  setChatState,
  setFormSubmitted,
  setNotificationState,
  setWidgetState,
  setTheme,
  setIdentifier,
} = userInteractionsSlice.actions;

export default userInteractionsSlice.reducer;