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
      const isQuestionActive = activeQuestions.some(
        (q) => q.id === questionObj.id && q.message_id === message_id
      )

      if (!isQuestionActive) {
        const filteredActiveQuestions = activeQuestions.filter(
          q => !(q.message_id === message_id && q.id === questionObj.id)
        )
        dispatch(setActiveQuestions([...filteredActiveQuestions, {
          id: questionObj.id,
          message_id,
          question: questionObj.question
        }]))
      }

      const currentHidden = questionsArr
        .filter((q) => q.id !== questionObj.id)
        .map((q) => ({ id: q.id, message_id, question: q.question }))

      const filteredHiddenQuestions = hiddenQuestions.filter(h => 
        !(h.message_id === message_id && h.id === questionObj.id))
      const newHidden = [...filteredHiddenQuestions, ...currentHidden]

      dispatch(setHiddenQuestions(newHidden))
      dispatch(fetchGivenQuestion(questionObj.id))
    }
  }

  // Show questions normally - don't hide them based on user typing
  const displayedQuestions = questionsArr.filter(
    (q) => !hiddenQuestions.some(h => h.id === q.id && h.message_id === message_id)
  )

  return (
    <div className="flex animate-fadeIn flex-col items-end justify-center gap-2 text-xs sm:gap-3">
      {displayedQuestions.map((item, index) => {
        const isDisabled = activeQuestions.some(
          (q) => q.id === item.id && q.message_id === message_id
        ) || isChosenQuestion

        return (
          <div
            key={index}
            onClick={() => !isDisabled && handleQuestionClick(item)}
            className={`outline-none transition-all duration-300 ${
              isDisabled
                ? 'bg-primaryColor cursor-not-allowed text-white'
                : 'cursor-pointer border border-primaryColor text-white hover:bg-primaryColor hover:text-white'
            } rounded-rad`}
          >
            <p className="w-fit px-2 py-3 text-center font-medium">
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