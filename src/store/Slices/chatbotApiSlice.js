import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getQuestions,
  ansUserQuestion,
  ansGivenQuestion,
} from "@/API/techMateApi";

// Get All questions when the page loads
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetchAllQuestions",
  async (_, thunkAPI) => {
    try {
      const questions = await getQuestions();
      console.log(questions);
      return questions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get ans for user input question
export const fetchUserQuestion = createAsyncThunk(
  "questions/fetchUserQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;

      if (!conversation_id) {
        return thunkAPI.rejectWithValue("No conversation_id found");
      }

      const response = await ansUserQuestion(conversation_id, question);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get ans for given question
export const fetchGivenQuestion = createAsyncThunk(
  "questions/fetchGivenQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;

      if (!conversation_id) {
        return thunkAPI.rejectWithValue("No conversation_id found");
      }

      const response = await ansGivenQuestion(conversation_id, question);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  lastResponse: null,
  conversationId: "",
  messages: [
    {
      id: 1,
      text: "Γεια σας! \nΕίμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλες\nτις απορίες σας σχετικά με ασφάλειες και καλύψεις.",
      questions: [],
      query: "",
    },
  ],
  formID: "",
  questionId: "",
  isLoading: false,
  error: null,
};

const chatbotApiSlice = createSlice({
  name: "chatbotApi",
  initialState: initialState,
  reducers: {
    setLastResponse: (state, action) => {
      state.lastResponse = action.payload;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setFormID: (state, action) => {
      state.formID = action.payload;
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Questions When the App Starts
      .addCase(fetchAllQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages[0].questions = action.payload.questions;
        state.conversationId = action.payload.conversation_id;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Answer for User Input Question
      .addCase(fetchUserQuestion.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;

        state.messages.push({
          id: state.messages.length + 1,
          text: "...",
          questions: [],
          query: action.meta.arg,
        });
      })
      .addCase(fetchUserQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastResponse = action.payload;

        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = action.payload.answer;
        lastMessage.questions = action.payload.follow_up;
      })
      .addCase(fetchUserQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = "Failed to fetch response.";
        lastMessage.questions = [];
      })

      // Fetch Answer for Given Question
      .addCase(fetchGivenQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;

        state.messages.push({
          id: state.messages.length + 1,
          text: "...",
          questions: [],
        });
      })
      .addCase(fetchGivenQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastResponse = action.payload;
        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = action.payload.answer;
        lastMessage.questions = action.payload.follow_up;
      })
      .addCase(fetchGivenQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = "Failed to fetch response.";
        lastMessage.questions = [];
      });
  },
});

export const {
  setLastResponse,
  setConversationId,
  setQuestions,
  setFormID,
  setQuestionId,
} = chatbotApiSlice.actions;

export default chatbotApiSlice.reducer;
