import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestions, ansUserQuestion, ansGivenQuestion } from "@/API/techMateApi";

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
      console.log("[fetchAllQuestions] Response:", response);
      const { questions, image, logo, conversation_id, texts } = response;
      return {
        questions,
        imageUrl: image,
        logoUrl: logo,
        conversation_id,
        texts,
      };
    } catch (error) {
      console.error("[fetchAllQuestions] Error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * Fetch an answer for a user's input question.
 */
export const fetchUserQuestion = createAsyncThunk(
  "questions/fetchUserQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;
      if (!conversation_id) {
        console.error("[fetchUserQuestion] No conversation_id found");
        return thunkAPI.rejectWithValue("No conversation_id found");
      }
      const response = await ansUserQuestion(conversation_id, question);
      console.log("[fetchUserQuestion] Response:", response);
      return response;
    } catch (error) {
      console.error("[fetchUserQuestion] Error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * Fetch an answer for a pre-defined question.
 */
export const fetchGivenQuestion = createAsyncThunk(
  "questions/fetchGivenQuestion",
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const conversation_id = state.chatbotApi.conversationId;
      if (!conversation_id) {
        console.error("[fetchGivenQuestion] No conversation_id found");
        return thunkAPI.rejectWithValue("No conversation_id found");
      }
      const response = await ansGivenQuestion(conversation_id, question);
      console.log("[fetchGivenQuestion] Response:", response);
      return response;
    } catch (error) {
      console.error("[fetchGivenQuestion] Error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  lastResponse: null,
  conversationId: "",
  activeQuestions: [],
  hiddenQuestions: [],
  notificationQuestions: [],
  messages: [
    {
      id: 1,
      text: DEFAULT_GREETING_BODY,
      questions: [],
      query: "",
      source: "chat",
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
      console.log("[setLastResponse] New lastResponse:", action.payload);
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
      console.log("[setConversationId] New conversationId:", action.payload);
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
      console.log("[setQuestions] Questions set:", action.payload);
    },
    setFormID: (state, action) => {
      state.formID = action.payload;
      console.log("[setFormID] New formID:", action.payload);
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
      console.log("[setQuestionId] New questionId:", action.payload);
    },
    setActiveQuestions: (state, action) => {
      state.activeQuestions = action.payload;
      console.log("[setActiveQuestions] Active questions updated:", action.payload);
    },
    // New reducer for updating hidden questions
    setHiddenQuestions: (state, action) => {
      state.hiddenQuestions = action.payload;
      console.log("[setHiddenQuestions] Hidden questions updated:", action.payload);
    },
    removeLastMessage: (state) => {
      if (state.messages.length > 0) {
        state.messages.pop();
        console.log("[removeLastMessage] Updated messages:", state.messages);
      }
    },
    /**
     * resetMessages: Reinitializes chat messages so that the greeting always appears first.
     * If a question is provided in the payload, it adds a message for that question after the greeting.
     */
    resetMessages: (state, action) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY;
      state.messages = [
        {
          id: 1,
          text: greetingBody,
          questions: [],
          query: "",
          source: "chat",
        },
      ];
      console.log("[resetMessages] Greeting set:", state.messages);
      if (action.payload?.question) {
        state.messages.push({
          id: 2,
          text: "",
          questions: [action.payload.question],
          query: "",
          isQuestion: true,
          source: "chat",
        });
        console.log("[resetMessages] Added selected question:", action.payload.question);
      }
    },
    /**
     * restartChat: Reinitializes chat messages (chat source only) without affecting widget messages.
     */
    restartChat: (state) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY;
      state.messages = state.messages.filter((msg) => msg.source !== "chat");
      state.messages.unshift({
        id: 1,
        text: greetingBody,
        questions: [],
        query: "",
        source: "chat",
      });
      console.log("[restartChat] Chat restarted:", state.messages);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Questions
      .addCase(fetchAllQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("[fetchAllQuestions.pending] Loading questions...");
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversationId = action.payload.conversation_id;
        state.imageUrl = action.payload.imageUrl;
        state.logoUrl = action.payload.logoUrl;
        state.texts = action.payload.texts;
        // If no active question exists, update the greeting message with the full questions list.
        if (state.activeQuestions.length === 0) {
          if (state.messages.length > 0 && state.messages[0].source === "chat") {
            state.messages[0].questions = action.payload.questions || [];
          } else {
            state.messages.unshift({
              id: 1,
              text:
                state.texts?.greetings?.chatBody?.greetingBody ||
                DEFAULT_GREETING_BODY,
              questions: action.payload.questions || [],
              query: "",
              source: "chat",
            });
          }
          console.log("[fetchAllQuestions.fulfilled] Updated state.messages (no active question):", state.messages);
        } else {
          // If there is an active question, update only the greeting text.
          if (state.messages.length > 0 && state.messages[0].source === "chat") {
            state.messages[0].text = state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY;
          } else {
            state.messages.unshift({
              id: 1,
              text: state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY,
              questions: [],
              query: "",
              source: "chat",
            });
          }
          console.log("[fetchAllQuestions.fulfilled] Active question present, greeting text updated:", state.messages[0]);
        }
        // Store the first 3 questions for notifications permanently.
        state.notificationQuestions = (action.payload.questions || []).slice(0, 3);
        console.log("[fetchAllQuestions.fulfilled] notificationQuestions:", state.notificationQuestions);
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("[fetchAllQuestions.rejected] Error:", action.payload);
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
          source: "chat",
        });
        console.log("[fetchUserQuestion.pending] Added placeholder message:", state.messages[state.messages.length - 1]);
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
        console.log("[fetchUserQuestion.fulfilled] Updated last message:", lastMessage);
      })
      .addCase(fetchUserQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = "Failed to fetch response.";
        lastMessage.questions = [];
        console.error("[fetchUserQuestion.rejected] Error:", action.payload);
      })
      // Fetch Answer for Given Question
      .addCase(fetchGivenQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.messages.push({
          id: state.messages.length + 1,
          text: "...",
          questions: [],
          source: "chat",
        });
        console.log("[fetchGivenQuestion.pending] Added placeholder message:", state.messages[state.messages.length - 1]);
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
        console.log("[fetchGivenQuestion.fulfilled] Updated last message:", lastMessage);
      })
      .addCase(fetchGivenQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        const lastMessage = state.messages[state.messages.length - 1];
        lastMessage.text = "Failed to fetch response.";
        lastMessage.questions = [];
        console.error("[fetchGivenQuestion.rejected] Error:", action.payload);
      });
  },
});

export const {
  setLastResponse,
  setConversationId,
  setQuestions,
  setFormID,
  setQuestionId,
  setActiveQuestions,
  setHiddenQuestions,
  removeLastMessage,
  resetMessages,
  restartChat,
} = chatbotApiSlice.actions;

export default chatbotApiSlice.reducer;