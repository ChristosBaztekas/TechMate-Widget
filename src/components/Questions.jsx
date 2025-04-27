import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGivenQuestion,
  setActiveQuestions,
  setHiddenQuestions,
} from '@/store/Slices/chatbotApiSlice'

const Questions = ({ questionsArr, isChosenQuestion = false, message_id }) => {
  const dispatch = useDispatch()
  const activeQuestions = useSelector(
    (state) => state.chatbotApi.activeQuestions,
  )
  const hiddenQuestions = useSelector(
    (state) => state.chatbotApi.hiddenQuestions,
  )

  const handleQuestionClick = (questionObj) => {
    if (!isChosenQuestion) {
      // Only append if the question has a different message_id or is not already active
      const isQuestionActive = activeQuestions.some(
        (q) => q.id === questionObj.id && q.message_id === message_id
      )

      if (!isQuestionActive) {
        // Remove any previous active questions with the same message_id
        const filteredActiveQuestions = activeQuestions.filter(
          q => q.message_id !== message_id
        )
        dispatch(setActiveQuestions([...filteredActiveQuestions, {
          id: questionObj.id,
          message_id,
          question: questionObj.question
        }]))
      }

      // For the current batch, mark all other questions as hidden
      const currentHidden = questionsArr
        .filter((q) => q.id !== questionObj.id)
        .map((q) => ({ id: q.id, message_id, question: q.question }))

      // Remove any previous hidden questions with the same message_id
      const filteredHiddenQuestions = hiddenQuestions.filter(h => h.message_id !== message_id)
      const newHidden = [...filteredHiddenQuestions, ...currentHidden]

      dispatch(setHiddenQuestions(newHidden))
      dispatch(fetchGivenQuestion(questionObj.id))
    }
  }

  const displayedQuestions = questionsArr.filter(
    (q) => !hiddenQuestions.some(h => h.id === q.id && h.message_id === message_id)
  )

  return (
    <div className="flex animate-fadeIn flex-col items-end justify-center gap-2 text-xs sm:gap-3">
      {displayedQuestions.map((item, index) => {
        // Check if this question is active in the current message context
        const isDisabled = activeQuestions.some(
          (q) => q.id === item.id && q.message_id === message_id
        ) || isChosenQuestion

        return (
          <div
            key={index}
            onClick={() => !isDisabled && handleQuestionClick(item)}
            className={`outline-none transition-all duration-300 ${isDisabled
              ? 'bg-primaryColor cursor-not-allowed'
              : 'cursor-pointer border border-primaryColor hover:bg-primaryColor'
              } rounded-rad`}
          >
            <p className="w-fit px-2 py-3 text-center font-medium text-lightColor">
              {item.question}
            </p>
          </div>
        )
      })}
    </div>
  )
}

Questions.propTypes = {
  questionsArr: propTypes.array.isRequired,
  isChosenQuestion: propTypes.bool,
  message_id: propTypes.string,
}

export default Questions
