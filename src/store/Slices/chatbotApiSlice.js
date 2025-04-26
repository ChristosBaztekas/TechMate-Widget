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
      console.error('[API ERROR] fetchAllQuestions:', error)
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
        console.warn('[API WARN] No conversation_id found')
        return thunkAPI.rejectWithValue('No conversation_id found')
      }

      const response = await ansUserQuestion(conversation_id, question)
      return response
    } catch (error) {
      console.error('[API ERROR] fetchUserQuestion:', error)
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
        console.warn('[API WARN] No conversation_id found')
        return thunkAPI.rejectWithValue('No conversation_id found')
      }

      const response = await ansGivenQuestion(conversation_id, question)
      return response
    } catch (error) {
      console.error('[API ERROR] fetchGivenQuestion:', error)
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
      console.error('[API ERROR] refreshChat:', error)
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const initialState = {
  lastResponse: null,
  conversationId: '',
  activeQuestions: [],
  hiddenQuestions: [],
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
      state.activeQuestions = action.payload
    },
    setHiddenQuestions: (state, action) => {
      state.hiddenQuestions = action.payload
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
    /**
     * resetMessages: Reinitializes chat messages so that the greeting always appears first.
     * If a question is provided in the payload, it adds a message for that question after the greeting.
     */
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
          questions: [action.payload.question],
          query: '',
          isQuestion: true,
          source: 'chat',
        })
      }
    },
    /**
     * restartChat: Reinitializes chat messages (chat source only) without affecting widget messages.
     */
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
      // Keep the conversation state but remove the form message
      if (state.messages.length > 0) {
        state.messages.pop()
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Questions
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
        // If no active question exists, update the greeting message with the full questions list.
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
          // If there is an active question, update only the greeting text.
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
      // Fetch Answer for User Question
      .addCase(fetchUserQuestion.pending, (state, action) => {
        state.isLoading = true
        state.error = null
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
        if (action.payload.form_id) {
          state.formID = action.payload.form_id
        }
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.text = action.payload.answer
        lastMessage.questions = action.payload.follow_up
      })
      .addCase(fetchUserQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.text = 'Failed to fetch response.'
        lastMessage.questions = []
      })
      // Fetch Answer for Given Question
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
      })
      .addCase(fetchGivenQuestion.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        const lastMessage = state.messages[state.messages.length - 1]
        lastMessage.text = 'Failed to fetch response.'
        lastMessage.questions = []
      })
      // Refresh Chat
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
        // Reset all states
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
} = chatbotApiSlice.actions

export default chatbotApiSlice.reducer
