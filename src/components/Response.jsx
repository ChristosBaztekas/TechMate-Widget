import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChatLogo from '../assets/images/bot.webp'
import { CloseFeedbackIcon, DislikeIcon, LikeIcon } from '../utils/icons.util'
import { postFeedback } from '@/API/techMateApi'
import { setFeedback } from '@/store/Slices/chatbotApiSlice'

const ThinkingDots = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="animate-bounce [animation-delay:-0.3s]">•</span>
      <span className="animate-bounce [animation-delay:-0.15s]">•</span>
      <span className="animate-bounce">•</span>
    </div>
  )
}

const Response = ({ text, feedback, message_id }) => {
  const dispatch = useDispatch()
  const imageUrl = useSelector((state) => state.chatbotApi.imageUrl)
  const conversationId = useSelector((state) => state.chatbotApi.conversationId)
  const feedbackState = useSelector((state) => state.chatbotApi.feedback)

  const [isVisible, setIsVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const isLiked = feedbackState.likedMessages[message_id] || false
  const isDisliked = feedbackState.dislikedMessages[message_id] || false
  const showFeedbackOptions = feedbackState.showFeedbackOptions[message_id] ?? true
  const showDetailedFeedback = feedbackState.showDetailedFeedback[message_id] || false

  // Get feedback options from API response
  const detailedLikeOptions = feedback?.like?.map(item => item.value) || []
  const detailedDislikeOptions = feedback?.dislike?.map(item => item.value) || []

  useEffect(() => {
    let timer
    // Only show feedback if the message is complete (not "...")
    if (text !== '...') {
      timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    } else {
      setIsVisible(false)
    }

    return () => clearTimeout(timer)
  }, [text])

  // Effect to handle the 4-second timeout after selecting an option
  useEffect(() => {
    let timer
    if (selectedOption) {
      timer = setTimeout(() => {
        setSelectedOption(null)
        dispatch(setFeedback({ message_id, showDetailed: false }))
      }, 4000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedOption, message_id, dispatch])

  const handleFeedback = async (type) => {
    if (type === 'helpful') {
      if (isLiked) {
        // If already liked, reset the feedback
        dispatch(setFeedback({
          message_id,
          type: 'like',
          value: false,
          showOptions: true,
          showDetailed: false
        }))
      } else {
        // If not liked, set like and reset dislike
        dispatch(setFeedback({
          message_id,
          type: 'like',
          value: true,
          showOptions: false
        }))
        // Post like feedback immediately
        await postFeedback(conversationId, message_id, 1)
        // Show detailed feedback if there are options
        if (detailedLikeOptions && detailedLikeOptions.length > 0) {
          dispatch(setFeedback({
            message_id,
            showDetailed: true
          }))
        }
      }
    } else {
      if (isDisliked) {
        // If already disliked, reset the feedback
        dispatch(setFeedback({
          message_id,
          type: 'dislike',
          value: false,
          showOptions: true,
          showDetailed: false
        }))
      } else {
        // If not disliked, set dislike and reset like
        dispatch(setFeedback({
          message_id,
          type: 'dislike',
          value: true,
          showOptions: false
        }))
        // Post dislike feedback immediately
        await postFeedback(conversationId, message_id, 0)
        // Show detailed feedback if there are options
        if (detailedDislikeOptions && detailedDislikeOptions.length > 0) {
          dispatch(setFeedback({
            message_id,
            showDetailed: true
          }))
        }
      }
    }
  }

  const handleDetailedFeedback = async (option, type) => {
    setSelectedOption(option)
    // Find the feedback option ID from the API response
    const feedbackOption = type === 'like'
      ? feedback.like.find(item => item.value === option)
      : feedback.dislike.find(item => item.value === option)

    if (feedbackOption) {
      // Post feedback with the specific option
      await postFeedback(conversationId, message_id, type === 'like' ? 1 : 0, feedbackOption.id)
      dispatch(setFeedback({
        message_id,
        type: type,
        value: true,
        option
      }))
    }
  }

  const toggleDetailedFeedback = () => {
    dispatch(setFeedback({
      message_id,
      showDetailed: !showDetailedFeedback
    }))
  }

  return (
    <div className="flex animate-fadeInUp items-start justify-start gap-2 sm:gap-4 pt-4">
      {/* Logo Container */}
      <div className="mt-2 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-lightColor text-sm font-light transition-all duration-300 hover:scale-105">
        <img
          src={imageUrl || ChatLogo}
          alt="Chatbot Logo"
          loading="lazy"
          className="h-[50px] w-[50px] object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Chat Message */}
      <div className="relative prose prose-sm text-base font-light w-fit max-w-none rounded-rad bg-lightColor p-4 text-darkColor transition-all duration-300 hover:shadow-md">
        {/* Render raw HTML from backend or thinking dots */}
        {text === '...' ? (
          <ThinkingDots />
        ) : (
          <div
            className="animate-fadeIn"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        )}

        {/* Feedback Section - Only render if message is complete and feedback is enabled */}
        {feedback && (
          <div className={`flex items-center gap-2 transition-all duration-300 ${isVisible ? 'opacity-100 mt-2' : 'opacity-0'}`}>
            {isLiked ? (
              <div className="flex flex-col gap-2 w-full animate-scaleIn">
                <div className="text-primaryColor">
                  <LikeIcon />
                </div>
                {showDetailedFeedback && (
                  <div className="flex flex-wrap gap-2 animate-fadeInUp">
                    {selectedOption ? (
                      <button
                        className="text-left text-nowrap px-2 py-1 bg-primaryColor text-lightColor text-xs font-light rounded transition-all duration-300 hover:bg-hoverColor"
                      >
                        {selectedOption}
                      </button>
                    ) : (
                      <>
                        {detailedLikeOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleDetailedFeedback(option, 'like')}
                            className="text-left text-nowrap px-2 py-1 border border-[#6D6D6D] text-xs hover:bg-primaryColor hover:text-lightColor font-light rounded transition-all duration-300 hover:scale-105"
                          >
                            {option}
                          </button>
                        ))}
                        <button
                          onClick={toggleDetailedFeedback}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                          aria-label="Close feedback options"
                        >
                          <CloseFeedbackIcon />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : isDisliked ? (
              <div className="flex flex-col gap-2 w-full animate-scaleIn">
                <div className="text-primaryColor">
                  <DislikeIcon />
                </div>
                {showDetailedFeedback && (
                  <div className="flex flex-wrap gap-2 animate-fadeInUp">
                    {selectedOption ? (
                      <button
                        className="text-left text-nowrap px-2 py-1 bg-primaryColor text-lightColor text-xs font-light rounded transition-all duration-300 hover:bg-hoverColor"
                      >
                        {selectedOption}
                      </button>
                    ) : (
                      <>
                        {detailedDislikeOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleDetailedFeedback(option, 'dislike')}
                            className="text-left text-nowrap px-2 py-1 border border-[#6D6D6D] text-xs hover:bg-primaryColor hover:text-lightColor font-light rounded transition-all duration-300 hover:scale-105"
                          >
                            {option}
                          </button>
                        ))}
                        <button
                          onClick={toggleDetailedFeedback}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                          aria-label="Close feedback options"
                        >
                          <CloseFeedbackIcon />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : showFeedbackOptions ? (
              <>
                <button
                  onClick={() => handleFeedback('helpful')}
                  aria-label="Helpful response"
                  className='text-[#6D6D6D] transition-transform duration-300 hover:scale-110 hover:text-primaryColor'
                >
                  <LikeIcon />
                </button>
                <button
                  onClick={() => handleFeedback('not_helpful')}
                  className='text-[#6D6D6D] transition-transform duration-300 hover:scale-110 hover:text-primaryColor'
                >
                  <DislikeIcon />
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

Response.propTypes = {
  text: PropTypes.string.isRequired,
  message_id: PropTypes.string.isRequired,
  feedback: PropTypes.shape({
    like: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string
    })),
    dislike: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string
    }))
  })
}

export default Response