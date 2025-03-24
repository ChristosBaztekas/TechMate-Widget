import axiosInstance from "./axiosInstance";
import store from "@/store/index";

/**
 * Retrieves the user identifier from the Redux state.
 */
const getIdentifier = () => {
  const state = store.getState();
  return state.user.identifier;
};

/**
 * Fetches questions from the backend.
 * If the identifier is not yet available, it retries with a delay.
 *
 * @param {number} retryCount - Current retry attempt.
 * @param {number} maxRetries - Maximum number of retry attempts.
 * @param {number} delay - Delay between retries in milliseconds.
 * @returns {Promise<Object|null>} Response data or null on failure.
 */
const fetchQuestionsWithRetry = async (retryCount = 0, maxRetries = 5, delay = 1000) => {
  const identifier = "a15e78dc-e063-409f-8b7e-9639f3ed7f38";

  if (identifier) {
    try {
      const response = await axiosInstance.get(`/${identifier}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return null;
    }
  }

  if (retryCount < maxRetries) {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(fetchQuestionsWithRetry(retryCount + 1, maxRetries, delay)),
        delay
      )
    );
  }

  console.error("Max retries reached. Identifier not available.");
  return null;
};

/**
 * Public function to get chatbot questions.
 *
 * @returns {Promise<Object|null>}
 */
export const getQuestions = () => {
  return fetchQuestionsWithRetry();
};

/**
 * Sends a user's question to the backend.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} question - The user's question.
 * @returns {Promise<Object|null>}
 */
export const ansUserQuestion = async (conversation_id, question) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/question`, { question });
    return response.data;
  } catch (error) {
    console.error("Error sending user question:", error);
    return null;
  }
};

/**
 * Sends a predefined question by its ID.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} question_id - The question ID.
 * @returns {Promise<Object|null>}
 */
export const ansGivenQuestion = async (conversation_id, question_id) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/question`, { question_id });
    return response.data;
  } catch (error) {
    console.error("Error fetching answer for question ID:", error);
    return null;
  }
};

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
    });
    return response.data;
  } catch (error) {
    console.error("Error posting user info:", error);
    return null;
  }
};

/**
 * Submits user email.
 *
 * @param {string} conversation_id - The conversation ID.
 * @param {string} email - The user's email.
 * @returns {Promise<Object|null>}
 */
export const postUserEmail = async (conversation_id, email) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/form?id=3`, { email });
    return response.data;
  } catch (error) {
    console.error("Error posting user email:", error);
    return null;
  }
};

/**
 * Submits user phone number.
 *
 * @param {string} conversationId - The conversation ID.
 * @param {Object} data - Phone data payload (should include form_id and phone).
 * @returns {Promise<Object>}
 */
export const postUserPhone = async (conversationId, data) => {
  try {
    const response = await axiosInstance.post(`/${conversationId}/form?id=4`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting user phone:", error.response?.data || error.message);
    throw error;
  }
};
