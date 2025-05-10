import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getQuestions,
  ansUserQuestion,
  ansGivenQuestion,
} from '@/API/techMateApi'

// Default fallback greeting message
const DEFAULT_GREETING_BODY =
  'Γεια σας! Είμαι εδώ για να κάνω τη ζωή σας πιο εύκολη και να απαντήσω σε όλε τις απορίες σας σχετικά με ασφάλειες και καλύψεις.'

/**
 * Fetch all questions when the page loads.
 */
export const fetchAllQuestions = createAsyncThunk(
  'questions/fetchAllQuestions',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState()

      // Check if we already have a conversation ID and messages
      if (state.chatbotApi.conversationId && state.chatbotApi.messages.length > 0) {
        return {
          questions: state.chatbotApi.messages[0]?.questions || [],
          imageUrl: state.chatbotApi.imageUrl,
          logoUrl: state.chatbotApi.logoUrl,
          conversation_id: state.chatbotApi.conversationId,
          texts: state.chatbotApi.texts,
        }
      }

      const response = await getQuestions()
      const { questions, image, logo, conversation_id, texts } = response
      return {
        questions,
        imageUrl: image,
        logoUrl: logo,
        conversation_id,
        texts,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

/**
 * Fetch an answer for a user's input question.
 */
export const fetchUserQuestion = createAsyncThunk(
  'questions/fetchUserQuestion',
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const conversation_id = state.chatbotApi.conversationId

      if (!conversation_id) {
        return thunkAPI.rejectWithValue('No conversation_id found')
      }

      const response = await ansUserQuestion(conversation_id, question)
      if (!response) {
        return thunkAPI.rejectWithValue('Failed to get response')
      }
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

/**
 * Fetch an answer for a pre-defined question.
 */
export const fetchGivenQuestion = createAsyncThunk(
  'questions/fetchGivenQuestion',
  async (question, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const conversation_id = state.chatbotApi.conversationId

      if (!conversation_id) {
        return thunkAPI.rejectWithValue('No conversation_id found')
      }

      const response = await ansGivenQuestion(conversation_id, question)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const refreshChat = createAsyncThunk(
  'questions/refreshChat',
  async (_, thunkAPI) => {
    try {
      const response = await getQuestions()
      const { questions, image, logo, conversation_id, texts } = response
      return {
        questions,
        imageUrl: image,
        logoUrl: logo,
        conversation_id,
        texts,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const initialState = {
  lastResponse: null,
  conversationId: '',
  activeQuestions: [], // Array of { id, message_id, question }
  hiddenQuestions: [], // Array of { id, message_id, question }
  notificationQuestions: [],
  messages: [
    {
      id: 1,
      text: DEFAULT_GREETING_BODY,
      questions: [],
      query: '',
      source: 'chat',
    },
  ],
  formID: '',
  questionId: '',
  isLoading: false,
  error: null,
  imageUrl: '',
  logoUrl: '',
  texts: {},
  feedback: {
    likedMessages: {},
    dislikedMessages: {},
    selectedOptions: {},
    showFeedbackOptions: {},
    showDetailedFeedback: {},
  },
  initialQuestionsHidden: false, // Flag to track initial questions visibility
  streamingMessage: null, // Store the current streaming message
  animatedMessages: {}, // Track which messages have been animated
}

const chatbotApiSlice = createSlice({
  name: 'chatbotApi',
  initialState,
  reducers: {
    setLastResponse: (state, action) => {
      state.lastResponse = action.payload
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    setFormID: (state, action) => {
      state.formID = action.payload
    },
    setQuestionId: (state, action) => {
      state.questionId = action.payload
    },
    setActiveQuestions: (state, action) => {
      state.activeQuestions = action.payload.map(q => ({
        id: q.id,
        message_id: q.message_id,
        question: q.question
      }))
    },
    setHiddenQuestions: (state, action) => {
      state.hiddenQuestions = action.payload.map(q => ({
        id: q.id,
        message_id: q.message_id,
        question: q.question
      }))
    },
    removeLastMessage: (state) => {
      if (state.messages.length > 0) state.messages.pop()
    },
    addFormResponse: (state, action) => {
      const { text, questions = [] } = action.payload
      state.messages.push({
        id: state.messages.length + 1,
        text,
        questions,
        query: '',
        source: 'chat',
      })
    },
    resetMessages: (state, action) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY
      state.messages = [
        {
          id: 1,
          text: greetingBody,
          questions: [],
          query: '',
          source: 'chat',
        },
      ]
      if (action.payload?.question) {
        state.messages.push({
          id: 2,
          text: '',
          questions: [],
          query: action.payload.question.question,
          source: 'chat',
        })
      }
    },
    restartChat: (state) => {
      const greetingBody =
        state.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY
      state.messages = state.messages.filter((msg) => msg.source !== 'chat')
      state.messages.unshift({
        id: 1,
        text: greetingBody,
        questions: [],
        query: '',
        source: 'chat',
      })
    },
    navigateToForm: (state) => {
      if (state.messages.length > 0) {
        state.messages.pop()
      }
    },
    setFeedback: (state, action) => {
      const { message_id, type, value, option, showOptions, showDetailed } = action.payload

      if (type === 'like') {
        state.feedback.likedMessages[message_id] = value
        if (value) {
          state.feedback.dislikedMessages[message_id] = false
        }
      } else if (type === 'dislike') {
        state.feedback.dislikedMessages[message_id] = value
        if (value) {
          state.feedback.likedMessages[message_id] = false
        }
      }

      if (option !== undefined) {
        state.feedback.selectedOptions[message_id] = option
      }

      if (showOptions !== undefined) {
        state.feedback.showFeedbackOptions[message_id] = showOptions
      }

      if (showDetailed !== undefined) {
        state.feedback.showDetailedFeedback[message_id] = showDetailed
      }
    },
    updateStreamingMessage: (state, action) => {
      const { text, questions, feedback, message_id } = action.payload;
      const lastMessage = state.messages[state.messages.length - 1];

      if (lastMessage && lastMessage.text === '...') {
        lastMessage.text = text;
        if (questions) lastMessage.questions = questions;
        if (feedback) lastMessage.feedback = feedback;
        if (message_id) lastMessage.message_id = message_id;
      }
    },
    markMessageAnimated: (state, action) => {
      const messageId = action.payload;
      state.animatedMessages[messageId] = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.conversationId = action.payload.conversation_id
        state.imageUrl = action.payload.imageUrl
        state.logoUrl = action.payload.logoUrl
        state.texts = action.payload.texts
        if (state.activeQuestions.length === 0) {
          if (
            state.messages.length > 0 &&
            state.messages[0].source === 'chat'
          ) {
            state.messages[0].questions = action.payload.questions || []
          } else {
            state.messages.unshift({
              id: 1,
              text:
                state.texts?.greetings?.chatBody?.greetingBody ||
                DEFAULT_GREETING_BODY,
              questions: action.payload.questions || [],
              query: '',
              source: 'chat',
            })
          }
        } else {
          if (
            state.messages.length > 0 &&
            state.messages[0].source === 'chat'
          ) {
            state.messages[0].text =
              state.texts?.greetings?.chatBody?.greetingBody ||
              DEFAULT_GREETING_BODY
          } else {
            state.messages.unshift({
              id: 1,
              text:
                state.texts?.greetings?.chatBody?.greetingBody ||
                DEFAULT_GREETING_BODY,
              questions: [],
              query: '',
              source: 'chat',
            })
          }
        }

        state.messages[0].text =
          action.payload.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY

        state.notificationQuestions = (action.payload.questions || []).slice(0, 3)
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchUserQuestion.pending, (state, action) => {
        state.isLoading = true
        state.error = null
        // Ensure initial questions remain hidden
        if (!state.initialQuestionsHidden) {
          const initialQuestions = state.messages[0].questions;
          state.hiddenQuestions = [
            ...state.hiddenQuestions,
            ...initialQuestions.map(q => ({
              id: q.id,
              message_id: 'initial', // Use 'initial' as a placeholder for message_id
              question: q.question
            }))
          ];
          // Remove questions from the initial message to prevent reappearance
          state.messages[0].questions = [];
          state.initialQuestionsHidden = true; // Set flag to true after first interaction
        }
        state.messages.push({
          id: state.messages.length + 1,
          text: '...',
          questions: [],
          query: action.meta.arg,
          source: 'chat',
        })
      })
      .addCase(fetchUserQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.lastResponse = action.payload
        if (action.payload?.form_id) {
          state.formID = action.payload.form_id
        }
        const lastMessage = state.messages[state.messages.length - 1]
        if (lastMessage) {
          lastMessage.text = action.payload?.answer || 'Failed to get response'
          lastMessage.questions = action.payload?.follow_up || []
          lastMessage.feedback = action.payload?.feedback || null
          lastMessage.message_id = action.payload?.message_id || ''

          if (action.payload?.message_id) {
            state.feedback.showFeedbackOptions[action.payload.message_id] = true
            state.feedback.showDetailedFeedback[action.payload.message_id] = false
          }
        }
      })
      .addCase(fetchUserQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        const lastMessage = state.messages[state.messages.length - 1]
        if (lastMessage) {
          lastMessage.text = 'Failed to fetch response. Please try again.'
          lastMessage.questions = []
        }
      })
      .addCase(fetchGivenQuestion.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.messages.push({
          id: state.messages.length + 1,
          text: '...',
          questions: [],
          source: 'chat',
        })
      })
      .addCase(fetchGivenQuestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.lastResponse = action.payload
        if (action.payload.form_id) {
          state.formID = action.payload.form_id
        }
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.text = action.payload.answer
        lastMessage.questions = action.payload.follow_up
        lastMessage.feedback = action.payload.feedback
        lastMessage.message_id = action.payload.message_id
      })
      .addCase(fetchGivenQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.text = 'Failed to fetch response.'
        lastMessage.questions = []
      })
      .addCase(refreshChat.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refreshChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.conversationId = action.payload.conversation_id
        state.imageUrl = action.payload.imageUrl
        state.logoUrl = action.payload.logoUrl
        state.texts = action.payload.texts
        state.activeQuestions = []
        state.hiddenQuestions = []
        state.messages = [{
          id: 1,
          text: action.payload.texts?.greetings?.chatBody?.greetingBody || DEFAULT_GREETING_BODY,
          questions: action.payload.questions || [],
          query: '',
          source: 'chat',
        }]
        state.notificationQuestions = (action.payload.questions || []).slice(0, 3)
      })
      .addCase(refreshChat.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

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
  navigateToForm,
  addFormResponse,
  setFeedback,
  updateStreamingMessage,
  markMessageAnimated,
} = chatbotApiSlice.actions

export default chatbotApiSlice.reducer
