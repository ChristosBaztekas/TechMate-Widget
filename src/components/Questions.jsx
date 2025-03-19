import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchGivenQuestion, setActiveQuestions, setHiddenQuestions } from "@/store/Slices/chatbotApiSlice";

const Questions = ({ questionsArr, isChosenQuestion = false }) => {
  const dispatch = useDispatch();
  const activeQuestions = useSelector((state) => state.chatbotApi.activeQuestions);
  const hiddenQuestions = useSelector((state) => state.chatbotApi.hiddenQuestions);

  const handleQuestionClick = (questionObj) => {
    if (!isChosenQuestion) {
      // Append the new active question if not already present,
      // Previous active questions remain highlighted.
      if (!activeQuestions.some((q) => q.id === questionObj.id)) {
        dispatch(setActiveQuestions([...activeQuestions, questionObj]));
      }
      // For the current batch, mark all other questions as hidden.
      const currentHidden = questionsArr
        .filter((q) => q.id !== questionObj.id)
        .map((q) => q.id);
      // Merge with any previously hidden IDs (remove duplicates).
      const newHidden = Array.from(new Set([...hiddenQuestions, ...currentHidden]));
      dispatch(setHiddenQuestions(newHidden));
      dispatch(fetchGivenQuestion(questionObj.id));
    }
  };

  const displayedQuestions = questionsArr.filter(
    (q) => !hiddenQuestions.includes(q.id)
  );

  return (
    <div className="flex flex-col justify-center items-end gap-2 sm:gap-3 text-xs animate-fadeIn">
      {displayedQuestions.map((item, index) => (
        <div
          key={index}
          onClick={() => !isChosenQuestion && handleQuestionClick(item)}
          className={`
            transition-all duration-300 outline-none
            ${activeQuestions.some((q) => q.id === item.id) || isChosenQuestion
              ? "bg-primaryColor pointer-events-none"
              : "border border-primaryColor hover:bg-primaryColor cursor-pointer"
            }
            ${isChosenQuestion ? "pointer-events-none" : "cursor-pointer"}
            rounded-rad
          `}
        >
          <p className="w-fit text-center text-lightColor px-2 py-3 font-medium">
            {item.question}
          </p>
        </div>
      ))}
    </div>
  );
};

Questions.propTypes = {
  questionsArr: propTypes.array.isRequired,
  isChosenQuestion: propTypes.bool,
};

export default Questions;