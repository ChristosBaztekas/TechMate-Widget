import axiosInstance from './axiosInstance'
import store from '@/store/index'

/**
 * Retrieves the user identifier from the Redux state.
 */
const getIdentifier = () => {
  const state = store.getState()
  return state.user.identifier
}

/**
 * Fetches questions from the backend.
 * If the identifier is not yet available, it retries with a delay.
 *
 * @param {number} retryCount - Current retry attempt.
 * @param {number} maxRetries - Maximum number of retry attempts.
 * @param {number} delay - Delay between retries in milliseconds.
 * @returns {Promise<Object|null>} Response data or null on failure.
 */
const fetchQuestionsWithRetry = async (
  retryCount = 0,
  maxRetries = 10,
  delay = 1000,
) => {
  const identifier = getIdentifier()

  if (identifier) {
    try {
      const response = await axiosInstance.get(`/${identifier}`)
      return response.data
    } catch (error) {
      console.error('Error fetching questions:', error)
      return null
    }
  }

  if (retryCount < maxRetries) {
    const nextDelay = delay * 1.5
    if (retryCount > 0) {
      console.warn(
        `Retrying... Attempt ${retryCount + 1}/${maxRetries}, next try in ${nextDelay}ms`,
      )
    }

    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            fetchQuestionsWithRetry(retryCount + 1, maxRetries, nextDelay),
          ),
        nextDelay,
      ),
    )
  }

  console.error('Max retries reached. Identifier not available.')
  return null
}

/**
 * Public function to get chatbot questions.
 *
 * @returns {Promise<Object|null>}
 */
export const getQuestions = () => {
  return fetchQuestionsWithRetry()
}

/**
 * Sends a user's question to the backend.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} question - The user's question.
 * @param {function} onChunk - Callback function to handle streaming chunks.
 * @returns {Promise<Object|null>}
 */
export const ansUserQuestion = async (conversation_id, question, onChunk) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${conversation_id}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let finalResponse = null;

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // Process any remaining buffer
        if (buffer) {
          try {
            const lastChunk = JSON.parse(buffer);
            finalResponse = lastChunk;
            if (onChunk) onChunk(lastChunk);
          } catch (e) {
            console.error('Error parsing final chunk:', e);
          }
        }
        break;
      }

      // Decode the chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });

      // Try to parse complete JSON objects from the buffer
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.trim()) {
          try {
            const chunk = JSON.parse(line);
            if (onChunk) onChunk(chunk);
            finalResponse = chunk;
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }

    return finalResponse;
  } catch (error) {
    console.error('Error sending user question:', error);
    return null;
  }
}

/**
 * Sends a predefined question by its ID.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} question_id - The question ID.
 * @returns {Promise<Object|null>}
 */
export const ansGivenQuestion = async (conversation_id, question_id) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/question`, {
      question_id,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching answer for question ID:', error)
    return null
  }
}

/**
 * Submits user information (full name and phone).
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} full_name - The user's full name.
 * @param {string} phone - The user's phone number.
 * @returns {Promise<Object|null>}
 */
export const postUserInfo = async (conversation_id, full_name, phone) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/form?id=1`, {
      full_name,
      phone,
    })
    // Add response to chat history
    store.dispatch({
      type: 'chatbotApi/addFormResponse',
      payload: {
        text: response.data.answer || 'Thank you for submitting your information!',
        questions: response.data.follow_up || [],
      },
    })
    return response.data
  } catch (error) {
    console.error('Error posting user info:', error)
    throw error
  }
}

/**
 * Submits user email.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} email - The user's email.
 * @returns {Promise<Object|null>}
 */
export const postUserEmail = async (conversation_id, email) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/form?id=3`, {
      email,
    })
    // Add response to chat history
    store.dispatch({
      type: 'chatbotApi/addFormResponse',
      payload: {
        text: response.data.answer || 'Thank you for subscribing to our newsletter!',
        questions: response.data.follow_up || [],
      },
    })
    return response.data
  } catch (error) {
    console.error('Error posting user email:', error)
    throw error
  }
}

/**
 * Submits user phone number.
 *
 * @param {string} conversationId - The conversation ID.
 * @param {Object} data - Phone data payload (should include form_id and phone).
 * @returns {Promise<Object>}
 */
export const postUserPhone = async (conversationId, data) => {
  try {
    const response = await axiosInstance.post(
      `/${conversationId}/form?id=4`,
      data,
    )
    // Add response to chat history
    store.dispatch({
      type: 'chatbotApi/addFormResponse',
      payload: {
        text: response.data.answer || 'Thank you for providing your phone number!',
        questions: response.data.follow_up || [],
      },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error posting user phone:',
      error.response?.data || error.message,
    )
    throw error
  }
}

/**
 * Posts user feedback for a specific message
 * 
 * @param {string} conversation_id - The conversation ID
 * @param {string} message_id - The message ID from the question response
 * @param {number} feedback - 0 for dislike, 1 for like
 * @param {number} [feedback_option] - Optional feedback option ID from the dislike options
 * @param {string} [feedback_description] - Optional feedback description text
 * @returns {Promise<Object|null>}
 */
export const postFeedback = async (conversation_id, message_id, feedback, feedback_option, feedback_description) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/feedback`, {
      message_id,
      feedback,
      feedback_option,
      feedback_description
    })
    return response.data
  } catch (error) {
    console.error('Error posting feedback:', error)
    return null
  }
}