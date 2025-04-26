import propTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChatState } from '@/store/Slices/userSlice'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'
import Feedback from './Feedback'

const Header = ({ onCancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showFeedback, setShowFeedback] = useState(false)

  const { logoUrl, texts } = useSelector((state) => state.chatbotApi)

  const greetingHeader = texts?.greetings?.header || 'Γεια σας! 👋'

  const handleClose = () => {
    if (onCancel) {
      onCancel()
    } else {
      setShowFeedback(true)
    }
  }

  return (
    <>
      <header className="relative flex items-center justify-between bg-primaryColor px-5 py-2 text-primaryColor transition-all vsm:px-7">
        <div className="z-20 my-1 flex items-center justify-center gap-3 p-2 text-lightColor vsm:p-0">
          <button
            className="cursor-pointer hover:text-hoverColor"
            aria-label="Go back"
            onClick={() => {
              navigate('/')
              dispatch(setChatState(false))
            }}
          >
            <Icons.ArrowIcon />
          </button>
          <img
            src={logoUrl || Logo}
            alt="logo"
            className="w-12 cursor-pointer transition-all duration-300 hover:scale-95 hover:cursor-pointer"
            loading="lazy"
            onClick={() => {
              dispatch(setChatState(false))
              navigate('/first')
            }}
          />
          <h1 className="text-lg font-bold">{greetingHeader}</h1>
        </div>

        <button
          className="z-20 my-5 cursor-pointer text-lightColor hover:text-hoverColor"
          onClick={handleClose}
        >
          <Icons.CloseIcon />
        </button>
      </header>

      {showFeedback && (
        <Feedback />
      )}
    </>
  )
}

Header.propTypes = {
  onCancel: propTypes.func.isRequired
}

export default Header