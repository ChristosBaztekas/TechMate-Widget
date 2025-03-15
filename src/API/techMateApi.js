import axiosInstance from "./axiosInstance";
import store from '@/store/index';

const getIdentifier = () => {
  const state = store.getState();
  return state.user.identifier;
};

// first call when website starts
export const getQuestions = async () => {
  const identifier = getIdentifier();

  if (!identifier) {
    console.error("Identifier is not available.");
    return null;
  }
  try {
    const response = await axiosInstance.get(`/${identifier}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching questions", error);
    return null;
  }
};

// Send a question from user input
export const ansUserQuestion = async (conversation_id, question) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/question`, {
      question,
    });
    return response.data;
  } catch (error) {
    console.error("Error while sending question", error);
    return null;
  }
};

// Get ans for given question
export const ansGivenQuestion = async (conversation_id, question_id) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/question`, {
      question_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching answer", error);
    return null;
  }
};

// post user info name and phone
export const postUserInfo = async (conversation_id, full_name, phone) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/form?id=1`, {
      full_name,
      phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error while posting user info", error);
    return null;
  }
};

// post user info email only
export const postUserEmail = async (conversation_id, email) => {
  try {
    const response = await axiosInstance.post(`/${conversation_id}/form?id=2`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error while posting user email", error);
    return null;
  }
};