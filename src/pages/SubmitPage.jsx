import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setChatState } from '@/store/Slices/userSlice'
import Header from '@/components/Header'
import Footer from '../components/Footer'

export const SubmitPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // Get formType from navigate state (sent when navigating)
  const { formType } = location.state || {}

  // Get chatbot texts data from Redux store
  const { texts } = useSelector((state) => state.chatbotApi)

  // Completion data based on the formType
  const completionData = texts?.forms?.[formType]?.completion || {
    // Fallback data if no formType or completion data found
    icon: 'https://data.techmate.gr/icons/congrats.webp',
    title: 'Συγχαρητήρια!',
    description:
      'Έλαβες τη προσφορά σου και θα επικοινωνήσουμε μαζί σου το συντομότερο δυνατό!',
    button: 'Επιστροφή στο Chat',
    disclaimerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }

  useEffect(() => {
    // Update URL without reloading the page
    window.history.pushState({}, '', '/congratulations')
  }, [])

  const handleBackToChat = () => {
    dispatch(setChatState(false))
    navigate('/', { replace: true })
  }

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-darkColor">
      <div className="flex h-full flex-col justify-between bg-primaryColor">
        {/* Header component */}
        <Header />

        <main className="mx-6 flex h-full flex-col items-center justify-around text-lightColor vsm:mx-5">
          {/* Completion icon */}
          <img
            src={completionData.icon}
            alt="Congratulations"
            className="w-36 bg-contain"
            loading="lazy"
          />

          {/* Completion title */}
          <p className="text-center text-3xl font-bold sm:text-4xl">
            {completionData.title}
          </p>

          {/* Description and action button */}
          <div className="flex w-full flex-col items-center">
            <p className="mb-6 mt-4 text-center text-xl font-semibold sm:w-[85%] sm:text-2xl">
              {completionData.description}
            </p>

            <button
              className="h-16 w-full rounded-rad bg-hoverColor text-xl font-bold text-lightColor hover:opacity-90 sm:h-20"
              onClick={handleBackToChat}
            >
              {completionData.button}
            </button>
          </div>

          {/* Disclaimer text */}
          <p className="my-4 text-left text-xs font-medium vsm:my-2">
            {completionData.disclaimerText}
          </p>
        </main>

        {/* Footer component */}
        <Footer />
      </div>
    </section>
  )
}
