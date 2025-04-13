import { useDispatch, useSelector } from 'react-redux'
import { setChatState } from '@/store/Slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'

export const WelcomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logoUrl, texts } = useSelector((state) => state.chatbotApi)

  // Destructure texts from `welcome` instead of `greetings`
  const welcome = texts?.welcome || {}

  const header = welcome.header || 'Γεια σας! 👋'
  const subHeader =
    welcome.subHeader ||
    'Καλωσήρθατε στην υποστήριξη της TechMate! Είμαστε στη διάθεσή σας!'
  const returnToChatTitle = welcome.returnToChatTitle || 'Επιστροφή στο Chat'
  const returnToChatDesc =
    welcome.returnToChatDesc ||
    'Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!'
  const support24hTitle = welcome.support24hTitle || 'Υποστήριξη όλο το 24ωρο'
  const personalizationTitle =
    welcome.personalizationTitle || 'Προσωπική διαμόρφωση'
  const createAppointmentTitle =
    welcome.createAppointmentTitle || 'Δημιουργία ραντεβού'
  const footerText = welcome.footerText || 'www.techai.gr'

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col bg-darkColor">
      <div className="flex h-full flex-col justify-between">
        {/* Header */}
        <header className="relative flex items-start justify-between bg-primaryColor px-5 py-3 text-primaryColor transition-all vsm:px-7">
          {/* Pattern Icon */}
          <span className="absolute -bottom-12 left-0 right-0 h-fit w-full vsm:-bottom-16">
            <Icons.PatternIcon />
          </span>

          {/* Logo and Welcome Text */}
          <div className="z-20 flex flex-col items-start justify-center text-lightColor vsm:gap-2">
            <img
              src={logoUrl || Logo}
              alt="logo"
              className="my-5 w-14 vsm:w-auto xl:w-20"
              loading="lazy"
            />
            <h1 className="ml-5 text-3xl font-bold">{header}</h1>
            <h2 className="my-4 ml-5 text-lg vsm:my-1 sm:text-xl">
              {subHeader}
            </h2>
          </div>

          {/* Close Button */}
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

        {/* Return to Chat Button */}
        <Link
          to="/"
          onClick={() => dispatch(setChatState(false))}
          className="group z-50 mx-8 flex items-center justify-between rounded-rad bg-lightColor p-3 sm:mx-20 sm:max-h-[62px]"
        >
          <div>
            <p className="text-lg font-semibold">{returnToChatTitle}</p>
            <p className="text-darkColor/70 max-w-64 text-xs font-medium vsm:max-w-max">
              {returnToChatDesc}
            </p>
          </div>
          <span className="cursor-pointer text-primaryColor transition-all group-hover:rotate-[35deg] group-hover:text-hoverColor">
            <Icons.SendIcon />
          </span>
        </Link>

        {/* Main Links */}
        <main className="mx-10 flex-col justify-evenly overflow-scroll text-lightColor vsm:flex-row sm:flex">
          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col items-center justify-center gap-5 p-5 transition-all hover:text-primaryColor"
          >
            <Icons.ClockIcon />
            <p className="max-w-24 text-center text-sm">{support24hTitle}</p>
          </Link>

          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col items-center justify-center gap-5 p-5 transition-all hover:text-primaryColor"
          >
            <Icons.PaintIcon />
            <p className="max-w-24 text-center text-sm">
              {personalizationTitle}
            </p>
          </Link>

          <Link
            to="https://techai.gr/el/"
            target="_blank"
            className="flex flex-col items-center justify-center gap-5 p-5 transition-all hover:text-primaryColor"
          >
            <Icons.CalenderIcon />
            <p className="max-w-24 text-center text-sm">
              {createAppointmentTitle}
            </p>
          </Link>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-center border border-primaryColor bg-footerColor p-1 text-sm font-light text-lightColor">
          <Link target="_blank" to="http://www.techai.gr/">
            {footerText}
          </Link>
        </footer>
      </div>
    </section>
  )
}
