import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatClosed: true,
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
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setNotificationState: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setChatState, setFormSubmitted, setNotificationState } =
  userInteractionsSlice.actions;

export default userInteractionsSlice.reducer;
