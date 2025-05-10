import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { setChatState } from '@/store/Slices/userSlice'
import { fetchUserQuestion, navigateToForm, refreshChat } from '@/store/Slices/chatbotApiSlice'
import { ansUserQuestion } from '@/API/techMateApi'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'
import Query from '@/components/Query'
import Response from '@/components/Response'
import Footer from '../components/Footer'

const formsMap = {
  a: 'phone-form1',
  b: 'newsletter',
  c: 'congratulations',
}

export const StartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [isSingleLine, setIsSingleLine] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const chatContainerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const textareaRef = useRef(null)

  const { messages, conversationId, logoUrl, texts, isLoading } = useSelector(
    (state) => state.chatbotApi,
  )

  // Grab text content safely with fallback defaults
  const greetingHeader = texts?.greetings?.header || 'Γεια σας! 👋'
  const placeholderInput =
    texts?.greetings?.chatBody?.placeholderInputSend ||
    'Πληκτρολογήστε την ερώτησή σας...'
  const sendButtonText = texts?.greetings?.chatBody?.sendQuestionText || 'Send'

  // Handle scroll events
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      // If user has scrolled up more than 100px from bottom, disable auto-scroll
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShouldAutoScroll(isNearBottom)
    }
  }

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  // Auto scroll to bottom when messages change
  useEffect(() => {
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Scroll immediately
    scrollToBottom()

    // Set up a continuous scroll check for streaming responses
    const startContinuousScroll = () => {
      scrollToBottom()
      scrollTimeoutRef.current = setTimeout(startContinuousScroll, 100)
    }

    startContinuousScroll()

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [messages, shouldAutoScroll])

  const handleSendClick = async () => {
    if (!userInput.trim() || !conversationId || isNavigating) return

    // Enable auto-scroll when user sends a new message
    setShouldAutoScroll(true)

    // Add the user's message to the chat
    dispatch(fetchUserQuestion(userInput.trim()))

    // Handle streaming response
    const onChunk = (chunk) => {
      dispatch({
        type: 'chatbotApi/updateStreamingMessage',
        payload: {
          text: chunk.answer || '',
          questions: chunk.follow_up,
          feedback: chunk.feedback,
          message_id: chunk.message_id
        }
      });
      // Scroll to bottom on each chunk update if auto-scroll is enabled
      scrollToBottom()
    };

    try {
      await ansUserQuestion(conversationId, userInput.trim(), onChunk);
    } catch (error) {
      console.error('Error in streaming response:', error);
    }

    setUserInput('')
    setIsSingleLine(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleInput = (e) => {
    const textarea = e.target

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`

    if (textarea.scrollHeight <= 40) {
      setIsSingleLine(true)
    } else {
      setIsSingleLine(false)
    }

    if (!textarea.value.trim()) {
      textarea.style.height = 'auto'
      setIsSingleLine(true)
    }
  }

  useEffect(() => {
    if (messages.length > 0 && !isNavigating) {
      const lastMessage = messages[messages.length - 1]

      if (lastMessage.text.startsWith('form')) {
        setIsNavigating(true)
        const lastChar = lastMessage.text.slice(-1)
        const form = formsMap[lastChar]

        // Use the new navigateToForm action
        dispatch(navigateToForm())
        dispatch(setChatState(true))

        // Use replace to prevent adding to history stack
        navigate(`/${form}`, { replace: true })
      }
    }
  }, [messages, dispatch, navigate])

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-darkColor">
      {/* Header */}
      <header className="relative pt-3 flex items-start justify-between px-5 text-primaryColor bg-primaryColor transition-all vsm:items-center vsm:px-7">
        <span className="absolute left-0 right-0 top-1 h-fit w-full sm:top-0 z-20">
          <Icons.PatternIcon />
        </span>

        <div className="z-20 flex items-center justify-center gap-3 text-lightColor">
          <button
            className="cursor-pointer hover:text-hoverColor"
            onClick={() => {
              dispatch(setChatState(true))
              navigate('/')
            }}
            aria-label="Go back"
          >
            <Icons.ArrowIcon />
          </button>
          <img
            src={logoUrl || Logo}
            alt="logo"
            className="w-10 cursor-pointer"
            loading="lazy"
            onClick={() => navigate('/first')}
          />
          <h1 className="font-bold">{greetingHeader}</h1>
        </div>

        <div className="z-20 flex items-center justify-center gap-2 text-lightColor">
          <button
            className="cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-[360deg] hover:text-hoverColor"
            onClick={() => dispatch(refreshChat())}
            aria-label="Refresh chat"
          >
            <Icons.RefreshIcon />
          </button>
          <button
            className="cursor-pointer hover:text-hoverColor"
            onClick={() => {
              dispatch(setChatState(true))
              navigate('/')
            }}
            aria-label="Close"
          >
            <Icons.CloseIcon />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex flex-grow flex-col gap-5 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-8 sm:pt-8 border-x-2 border-primaryColor scroll-smooth"
      >
        {messages.map((message, index) => {
          if (message.text.startsWith('form')) {
            const lastChar = message.text.slice(-1)
            const form = formsMap[lastChar]

            navigate(`/${form}`)

            return null
          }

          return (
            <div key={index} className="flex flex-col gap-5">
              {message.query && !message.isQuestion && (
                <Query query={message.query} />
              )}

              {message.text && !message.isQuestion && (
                <Response
                  text={message.text}
                  feedback={message.feedback}
                  message_id={message.message_id || ''}
                  isLastMessage={index === messages.length - 1}
                  questions={message.questions}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Input + Send */}
      <div className="flex items-end justify-center bg-gradient-to-r from-primaryColor to-gradientColor py-4 px-[22px]">
        <textarea
          ref={textareaRef}
          placeholder={placeholderInput}
          className={`min-h-10 max-h-40 w-full resize-none overflow-scroll p-2 pl-5 text-sm outline-none transition-all duration-300 vsm:text-base ${isSingleLine ? 'rounded-3xl' : 'rounded-rad'} `}
          aria-label="Message input field"
          rows={1}
          onInput={handleInput}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              e.preventDefault()
              handleSendClick()
            }
          }}
        />

        <button
          type="submit"
          className={`ml-6 mb-2 font-bold text-white hover:text-hoverColor ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSendClick}
          disabled={isLoading}
        >
          {sendButtonText}
        </button>
      </div>

      <Footer />
    </section>
  )
}

StartPage.propTypes = {
  radius: propTypes.string,
}
