import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchGivenQuestion } from "@/store/Slices/chatbotApiSlice";
const Questions = ({ questionsArr }) => {
  const dispatch = useDispatch();

  const handleQuestionClick = (question_id) => {
    dispatch(fetchGivenQuestion(question_id));
  };

  return (
    <div className="flex flex-col justify-center items-end gap-2 sm:gap-3 text-xs">
      {questionsArr.map((item, index) => (
        // Option Container
        <div key={index} onClick={() => handleQuestionClick(item.id)}>
          <p
            style={{ borderRadius: "10px" }}
            className="w-fit text-lightColor border border-primaryColor hover:bg-primaryColor text-center px-4 py-3 cursor-pointer transition-all"
          >
            {item.question}
          </p>
        </div>
      ))}
    </div>
  );
};

Questions.propTypes = {
  questionsArr: propTypes.array,
};

export default Questions;
