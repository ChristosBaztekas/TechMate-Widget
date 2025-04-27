import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllQuestions } from '@/store/Slices/chatbotApiSlice'
import { setChatState, setNotificationState, setWidgetState, setTheme, setIdentifier, setNotificationDelay, } from '@/store/Slices/userSlice'
import { sendDimensionsToParent } from '@/utils/functions.util'
import { StartPage } from '@/pages'
import Logo from '@/assets/images/Logo.webp'
import { Widget } from '../components/Widget'
import { Notifications } from '@/components/Notifications'
import { useLocation } from 'react-router-dom'

export const MainPage = () => {
  const dispatch = useDispatch()

  const {
    isChatClosed,
    notification,
    isWidgetClosed,
    theme,
    notificationDelay,
  } = useSelector((state) => state.user)
  const { imageUrl, logoUrl, conversationId } = useSelector((state) => state.chatbotApi)
  const notificationTimerRef = useRef(null)
  const location = useLocation()

  // Theme handling
  useEffect(() => {
    const themes = {
      purple: {
        primaryColor: '#501AC8',
        hoverColor: '#B366CF',
        gradientColor: '#1C064C',
        footerColor: '#501AC8',
      },
      green: {
        primaryColor: '#0D642F',
        hoverColor: '#7CB937',
        gradientColor: '#03421C',
        footerColor: '#0D642F',
      },
      red: {
        primaryColor: '#C7313D',
        hoverColor: '#E55640',
        gradientColor: '#681017',
        footerColor: '#C7313D',
      },
      blue: {
        primaryColor: '#0077B6',
        hoverColor: '#184A88',
        gradientColor: '#03045E',
        footerColor: '#0077B6',
      },
      orange: {
        primaryColor: '#D27000',
        hoverColor: '#935600',
        gradientColor: '#935600',
        footerColor: '#D27000',
      },
      yellow: {
        primaryColor: '#E1C720',
        hoverColor: '#D2A203',
        gradientColor: '#997500',
        footerColor: '#E1C720',
      },
    }

    const selectedTheme = themes[theme] || themes['purple']

    Object.keys(selectedTheme).forEach((key) => {
      document.documentElement.style.setProperty(
        `--${camelToKebab(key)}`,
        selectedTheme[key],
      )
    })
  }, [theme])

  const camelToKebab = (str) =>
    str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

  // Parent message listener
  useEffect(() => {
    const handleMessage = (event) => {

      const data = event.data
      if (data?.type === 'chatbot-config') {
        const {
          theme,
          showWidget,
          identifier: receivedIdentifier,
          notificationDelay: delayFromParent,
        } = data.payload

        if (receivedIdentifier) dispatch(setIdentifier(receivedIdentifier))
        if (theme) dispatch(setTheme(theme))
        if (typeof showWidget === 'boolean')
          dispatch(setWidgetState(!showWidget))
        dispatch(
          setNotificationDelay(
            delayFromParent !== undefined ? delayFromParent * 1000 : 10000,
          ),
        )
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [dispatch])

  // Send widget/chat size to parent
  useEffect(() => {
    if (!isWidgetClosed) {
      sendDimensionsToParent('200px', '280px', false, isWidgetClosed)
    } else if (isChatClosed && notification) {
      sendDimensionsToParent('290px', '280px', true, isWidgetClosed)
    } else if (isChatClosed) {
      sendDimensionsToParent('95px', '88px', true, isWidgetClosed)
    } else {
      sendDimensionsToParent('33%', '588px', false, isWidgetClosed)
    }
  }, [isChatClosed, notification, isWidgetClosed])

  // Show notification immediately on mount if needed
  useEffect(() => {
    if (notificationDelay === null || notificationDelay === 1111) {
      dispatch(setNotificationState(false))
      return
    }

    dispatch(setNotificationState(true))
  }, [notificationDelay, dispatch])

  // Schedule notification re-show after user closes it
  const scheduleNotification = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current)
    }

    // Skip scheduling if chat is open
    if (!isChatClosed) {
      return
    }

    if (notificationDelay === null || notificationDelay === 1111) {
      return
    }

    if (notificationDelay <= 3000) {
      return
    }

    notificationTimerRef.current = setTimeout(() => {
      dispatch(setNotificationState(true))
    }, notificationDelay)
  }

  // Watch for notification closing to reschedule if needed
  useEffect(() => {
    if (notificationDelay === null || notificationDelay === 1111) {
      clearTimeout(notificationTimerRef.current)
      dispatch(setNotificationState(false))
      return
    }

    // Pause notification rescheduling if chat is open
    if (!isChatClosed) {
      clearTimeout(notificationTimerRef.current)
      return
    }

    if (!notification) {
      scheduleNotification()
    }

    return () => {
      clearTimeout(notificationTimerRef.current)
    }
  }, [notification, notificationDelay, isChatClosed, dispatch])

  // Fetch initial questions
  useEffect(() => {
    // Only fetch if we don't have a conversation ID and we're not on a form page
    if (!conversationId && !location.pathname.includes('form')) {
      dispatch(fetchAllQuestions())
    }
  }, [dispatch, conversationId, location.pathname])

  // Close widget handler
  const handleWidgetClose = () => {
    dispatch(setWidgetState(true))
  }

  // Close notification handler
  const handleCloseNotification = () => {
    dispatch(setNotificationState(false))

    if (notificationDelay === null || notificationDelay === 1111) {
      return
    }

    if (notificationDelay <= 3000) {
      return
    }

    scheduleNotification()
  }

  return (
    <>
      {!isWidgetClosed ? (
        <Widget onClose={handleWidgetClose} />
      ) : (
        <div className="mt-auto">
          {!isChatClosed ? (
            <StartPage />
          ) : (
            <div className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex flex-col items-end justify-end">
              {/* Notification */}
              {notification &&
                notificationDelay !== null &&
                notificationDelay !== 1111000 && (
                  <Notifications onClose={handleCloseNotification} />
                )}

              {/* Button to open chat */}
              <button
                onClick={() => {
                  dispatch(setChatState(false))
                  dispatch(setWidgetState(true))
                }}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="relative z-50 mt-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-sm animate-popup hover:scale-110 transition-transform duration-300"
                role="button"
                aria-label="Open chat"
              >
                <img
                  src={logoUrl || Logo}
                  alt="logo"
                  className="absolute -left-3 -top-1 w-8 animate-flow"
                  loading="lazy"
                />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
