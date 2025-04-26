import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGivenQuestion, resetMessages, restartChat, setActiveQuestions, } from '@/store/Slices/chatbotApiSlice'
import { setNotificationState, setChatState } from '@/store/Slices/userSlice'
import { sendDimensionsToParent } from '@/utils/functions.util'
import * as Icons from '@/utils/icons.util'

export const Notifications = () => {
  const dispatch = useDispatch()
  const { notificationQuestions, isLoading, error } = useSelector(
    (state) => state.chatbotApi,
  )

  if (isLoading) return null
  if (error) return null

  return (
    <main className="mt-auto flex items-start justify-center gap-2 animate-slide-in">
      <button
        className="mt-1 flex-shrink-0 cursor-pointer overflow-hidden rounded-full text-primaryColor hover:text-hoverColor hover:scale-110 transition-transform duration-300"
        onClick={() => dispatch(setNotificationState(false))}
        aria-label="Close"
      >
        <Icons.HideNotificationIcon />
      </button>
      <nav
        className="flex flex-col items-end justify-center gap-2 text-xs"
        aria-label="Notifications"
      >
        {notificationQuestions.map((item, index) => (
          <Link
            className="w-full"
            key={index}
            onClick={() => {
              dispatch(setNotificationState(true))
              dispatch(setChatState(false))
              dispatch(restartChat())
              dispatch(setActiveQuestions([]))
              dispatch(resetMessages({ question: item }))
              dispatch(fetchGivenQuestion(item.id))
              sendDimensionsToParent('33%', '70%', false)
            }}
          >
            <article className="ml-auto line-clamp-3 w-fit cursor-pointer rounded-rad border-2 border-primaryColor bg-lightColor px-2 py-2 text-center font-medium text-darkColor transition-all hover:bg-primaryColor hover:text-lightColor animate-notification-item">
              {item.question}
            </article>
          </Link>
        ))}
      </nav>
    </main>
  )
}

Notifications.propTypes = {
  radius: propTypes.string,
}