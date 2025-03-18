import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchGivenQuestion } from "@/store/Slices/chatbotApiSlice";

const Questions = ({ questionsArr, isChosenQuestion = false }) => {
  const dispatch = useDispatch();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (question_id) => {
    if (activeQuestion !== null) return;
    setActiveQuestion(question_id);
    dispatch(fetchGivenQuestion(question_id));
  };

  return (
    <div
      className="flex flex-col justify-center items-end gap-2 sm:gap-3 text-xs animate-fadeIn"
    >
      {questionsArr.map((item, index) => (
        (activeQuestion === null || activeQuestion === item.id || isChosenQuestion) && (
          <div
            key={index}
            onClick={() => !isChosenQuestion && handleQuestionClick(item.id)}
            className={`
              transition-all duration-300 outline-none
              ${activeQuestion === item.id || isChosenQuestion
                ? "bg-primaryColor"
                : "border border-primaryColor hover:bg-primaryColor"}
              ${isChosenQuestion ? "pointer-events-none" : "cursor-pointer"}
              rounded-rad
            `}
          >
            <p className="w-fit text-center text-lightColor px-2 py-3 font-medium">
              {item.question}
            </p>
          </div>
        )
      ))}
    </div>
  );
};

Questions.propTypes = {
  questionsArr: propTypes.array.isRequired,
  isChosenQuestion: propTypes.bool,
};

export default Questions;