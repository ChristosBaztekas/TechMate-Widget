import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChatState } from '@/store/Slices/userSlice'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { logoUrl, texts } = useSelector((state) => state.chatbotApi)

  const greetingHeader = texts?.greetings?.header || 'Γεια σας! 👋'

  return (
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
        onClick={() => {
          dispatch(setChatState(true))
          navigate('/')
        }}
      >
        <Icons.CloseIcon />
      </button>
    </header>
  )
}

export default Header