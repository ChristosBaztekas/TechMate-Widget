import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchGivenQuestion } from "@/store/Slices/chatbotApiSlice";

const Questions = ({ questionsArr }) => {
  const dispatch = useDispatch();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (question_id) => {
    setActiveQuestion(question_id);
    dispatch(fetchGivenQuestion(question_id));
  };

  return (
    <div className="flex flex-col justify-center items-end gap-2 sm:gap-3 text-xs animate-fadeIn">
      {questionsArr.map((item, index) => (
        activeQuestion === null || activeQuestion === item.id ? (
          <div
            key={index}
            onClick={() => handleQuestionClick(item.id)}
            className={activeQuestion === item.id ? "bg-primaryColor rounded-rad active" : ""}
          >
            <p className="w-fit text-center text-lightColor border border-primaryColor hover:bg-primaryColor px-2 py-3 cursor-pointer font-medium rounded-rad transition-all">
              {item.question}
            </p>
          </div>
        ) : null
      ))}
    </div>
  );
};

Questions.propTypes = {
  questionsArr: propTypes.array,
};

export default Questions;