import axiosInstance from "./axiosInstance";

const websiteId = "a15e78dc-e063-409f-8b7e-9639f3ed7f38";

// first call when website starts
export const getQuestions = async () => {
  try {
    const response = await axiosInstance.get(`/${websiteId}`);
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
