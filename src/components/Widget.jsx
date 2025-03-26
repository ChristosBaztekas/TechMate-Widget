import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNotificationState,
  setChatState,
  setWidgetState,
} from '@/store/Slices/userSlice'
import {
  fetchGivenQuestion,
  resetMessages,
} from '@/store/Slices/chatbotApiSlice'
import { sendDimensionsToParent } from '@/utils/functions.util'
import Logo from '@/assets/images/Logo.webp'
import * as Icons from '@/utils/icons.util'

export const Widget = () => {
  const dispatch = useDispatch()
  const { messages, isLoading, error, logoUrl, texts } = useSelector(
    (state) => state.chatbotApi,
  )

  const [activeQuestion, setActiveQuestion] = useState(null)

  if (isLoading) return null
  if (error) return null

  const handleQuestionClick = (item) => {
    setActiveQuestion(item.id)
    dispatch(resetMessages({ question: item }))
    dispatch(fetchGivenQuestion(item.id))
    dispatch(setNotificationState(true))
    dispatch(setChatState(false))
    sendDimensionsToParent('33%', '70%', false)
    dispatch(setWidgetState(true))
  }

  const handleCloseWidget = () => {
    dispatch(setWidgetState(true))
  }

  // Get greeting bubble array from API response
  const greetingBubble = texts?.greetings?.bubble || [
    'Γεια σου!',
    'Πώς μπορώ να σε βοηθήσω;',
  ]

  return (
    <div className="relative mx-auto mb-5 ml-5 rounded-[20px] bg-darkColor px-3 py-5 text-lightColor vsm:mb-0 vsm:ml-auto vsm:mr-5">
      <span className="flex items-center justify-start gap-3">
        <img
          src={logoUrl || Logo}
          alt="logo"
          className="w-18 flex-shrink-0"
          loading="lazy"
        />

        <p className="text-left">
          {greetingBubble.map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </span>

      {/* Notification links (questions) */}
      <nav className="mt-5 flex w-full flex-col items-center justify-center gap-3 text-xs">
        {messages[0]?.questions.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            onClick={() => handleQuestionClick(item)}
            className={activeQuestion === item.id ? 'active' : ''}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <article className="line-clamp-2 w-full cursor-pointer rounded-full border-2 border-primaryColor px-2 py-2 text-center font-medium text-lightColor transition-all hover:bg-primaryColor">
              {item.question}
            </article>
          </Link>
        ))}
      </nav>

      {/* Close Button */}
      <span
        onClick={handleCloseWidget}
        className="w-5 cursor-pointer text-primaryColor transition-all hover:text-hoverColor"
      >
        <Icons.HideWidgetIcon />
      </span>
    </div>
  )
}
