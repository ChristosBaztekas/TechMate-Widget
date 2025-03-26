import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import chatbotApiReducer from './Slices/chatbotApiSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    chatbotApi: chatbotApiReducer,
  },
})

export default store
