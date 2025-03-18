import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions, ansUserQuestion, ansGivenQuestion, } from "@/API/techMateApi";

// Default fallback greeting message
const DEFAULT_GREETING_BODY =
  "Γεια σας! Είμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλε τις απορίες σας σχετικά με ασφάλειες και καλύψεις.";

/**
 * Fetch all questions when the page loads.
 */
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetchAllQuestions",
  async (_, thunkAPI) => {
    try {
      const response = await getQuestions();

      const { questions, image, logo, conversation_id, texts } = response;

      return {
        questions,
        imageUrl: image,
        logoUrl: logo,
        conversation_id,
        texts,
      };
    } catch (error) {
      console.error("Error fetching all questions:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * Fetch an answer for a user's input question.
 *
 * @param {string} question - User's question.
 */
export const fetchUserQuestion = createAsyncThunk(
  "questions/fetchUserQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;

      if (!conversation_id) {
        console.error("No conversation_id found in fetchUserQuestion");
        return thunkAPI.rejectWithValue("No conversation_id found");
      }

      const response = await ansUserQuestion(conversation_id, question);
      return response;
    } catch (error) {
      console.error("Error fetching answer for user question:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * Fetch an answer for a pre-defined question.
 *
 * @param {string} question - Predefined question identifier.
 */
export const fetchGivenQuestion = createAsyncThunk(
  "questions/fetchGivenQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;

      if (!conversation_id) {
        console.error("No conversation_id found in fetchGivenQuestion");
        return thunkAPI.rejectWithValue("No conversation_id found");
      }

      const response = await ansGivenQuestion(conversation_id, question);
      return response;
    } catch (error) {
      console.error("Error fetching answer for given question:", error);
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
      text: DEFAULT_GREETING_BODY,
      questions: [],
      query: "",
    },
  ],
  formID: "",
  questionId: "",
  isLoading: false,
  error: null,
  imageUrl: "",
  logoUrl: "",
  texts: {},
};

const chatbotApiSlice = createSlice({
  name: "chatbotApi",
  initialState,
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
    removeLastMessage: (state) => {
      if (state.messages.length > 0) {
        state.messages.pop();
      }
    },
    resetMessages: (state, action) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY;
      if (action.payload?.question) {
        state.messages = [
          {
            id: 1,
            text: greetingBody,
            questions: [],
            query: "",
          },
          {
            id: 2,
            text: "",
            questions: [action.payload.question],
            query: "",
            isQuestion: true,
          },
        ];
      } else {
        state.messages = [
          {
            id: 1,
            text: greetingBody,
            questions: [],
            query: "",
          },
        ];
      }
    }
    ,
    restartChat: (state) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY;

      state.messages = [
        {
          id: 1,
          text: greetingBody,
          questions: [],
          query: "",
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Questions
      .addCase(fetchAllQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false;

        state.conversationId = action.payload.conversation_id;
        state.imageUrl = action.payload.imageUrl;
        state.logoUrl = action.payload.logoUrl;
        state.texts = action.payload.texts;

        const greetingBody =
          action.payload.texts?.greetings?.chatBody?.greetingBody ||
          DEFAULT_GREETING_BODY;

        if (state.messages.length > 0) {
          state.messages[0].text = greetingBody;
          state.messages[0].questions = action.payload.questions || [];
        } else {
          state.messages.push({
            id: 1,
            text: greetingBody,
            questions: action.payload.questions || [],
            query: "",
          });
        }
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Answer for User Question
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

        if (action.payload.form_id) {
          state.formID = action.payload.form_id;
        }

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

        if (action.payload.form_id) {
          state.formID = action.payload.form_id;
        }

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
  removeLastMessage,
  resetMessages,
  restartChat,
} = chatbotApiSlice.actions;

export default chatbotApiSlice.reducer;