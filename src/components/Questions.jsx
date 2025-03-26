import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGivenQuestion,
  setActiveQuestions,
  setHiddenQuestions,
} from '@/store/Slices/chatbotApiSlice'

const Questions = ({ questionsArr, isChosenQuestion = false }) => {
  const dispatch = useDispatch()
  const activeQuestions = useSelector(
    (state) => state.chatbotApi.activeQuestions,
  )
  const hiddenQuestions = useSelector(
    (state) => state.chatbotApi.hiddenQuestions,
  )

  const handleQuestionClick = (questionObj) => {
    if (!isChosenQuestion) {
      // Append the new active question if not already present,
      // Previous active questions remain highlighted.
      if (!activeQuestions.some((q) => q.id === questionObj.id)) {
        dispatch(setActiveQuestions([...activeQuestions, questionObj]))
      }
      // For the current batch, mark all other questions as hidden.
      const currentHidden = questionsArr
        .filter((q) => q.id !== questionObj.id)
        .map((q) => q.id)
      // Merge with any previously hidden IDs (remove duplicates).
      const newHidden = Array.from(
        new Set([...hiddenQuestions, ...currentHidden]),
      )
      dispatch(setHiddenQuestions(newHidden))
      dispatch(fetchGivenQuestion(questionObj.id))
    }
  }

  const displayedQuestions = questionsArr.filter(
    (q) => !hiddenQuestions.includes(q.id),
  )

  return (
    <div className="flex animate-fadeIn flex-col items-end justify-center gap-2 text-xs sm:gap-3">
      {displayedQuestions.map((item, index) => (
        <div
          key={index}
          onClick={() => !isChosenQuestion && handleQuestionClick(item)}
          className={`outline-none transition-all duration-300 ${
            activeQuestions.some((q) => q.id === item.id) || isChosenQuestion
              ? 'pointer-events-none bg-primaryColor'
              : 'cursor-pointer border border-primaryColor hover:bg-primaryColor'
          } ${isChosenQuestion ? 'pointer-events-none' : 'cursor-pointer'} rounded-rad`}
        >
          <p className="w-fit px-2 py-3 text-center font-medium text-lightColor">
            {item.question}
          </p>
        </div>
      ))}
    </div>
  )
}

Questions.propTypes = {
  questionsArr: propTypes.array.isRequired,
  isChosenQuestion: propTypes.bool,
}

export default Questions
