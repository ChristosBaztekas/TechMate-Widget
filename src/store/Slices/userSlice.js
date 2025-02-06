import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatClosed: true,
  userId: null,
  userName: "",
  lastInteraction: "",
  currentPage: "StartPage",
  formSubmitted: false,
  notification: false,
};

const userInteractionsSlice = createSlice({
  name: "userInteractions",
  initialState: initialState,
  reducers: {
    setChatState: (state, action) => {
      state.isChatClosed = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateLastInteraction: (state, action) => {
      state.lastInteraction = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setNotificationState: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {
  setChatState,
  setUserId,
  setUserName,
  updateLastInteraction,
  setCurrentPage,
  setFormSubmitted,
  setNotificationState,
} = userInteractionsSlice.actions;

export default userInteractionsSlice.reducer;
