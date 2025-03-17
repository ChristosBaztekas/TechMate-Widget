import { createSlice } from "@reduxjs/toolkit";

// Initial state for user interactions in the chatbot
const initialState = {
  isChatClosed: true,
  formSubmitted: false,
  notification: false,
  isWidgetClosed: false,
  theme: "purple",
  identifier: null,
  notificationDelay: 3000, // Default delay in ms (3 seconds)
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
      state.theme = action.payload;
    },
    setIdentifier: (state, action) => {
      state.identifier = action.payload;
    },

    // Accepts null or number. If null, notification is disabled forever.
    setNotificationDelay: (state, action) => {
      state.notificationDelay = action.payload;
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
  setNotificationDelay,
} = userInteractionsSlice.actions;

export default userInteractionsSlice.reducer;