import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '@/components/Header' // Components

export const CongratulationsPage = () => {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(10)
  const timeoutRef = useRef(null)

  const { texts } = useSelector((state) => state.chatbotApi)

  /**
   * Default timer frame content
   */
  const timerFrameDefaults = {
    title: 'Συγχαρητήρια!',
    description:
      'Συμπλήρωσε το τηλέφωνό σου για να σε καλέσουμε και να σε ενημερώσουμε για τη προσφορά σου!',
    button: 'Θέλω ΠΡΟΣΦΟΡΑ!',
  }

  /**
   * Merge defaults with API response
   */
  const timerFrameData = {
    ...timerFrameDefaults,
    ...(texts?.forms?.['form-c']?.timerFrame || {}),
  }

  useEffect(() => {
    if (counter <= 0) {
      navigate('/email-form2')
      return
    }

    timeoutRef.current = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1)
    }, 1000)

    return () => clearTimeout(timeoutRef.current)
  }, [counter, navigate])

  /**
   * Cancel Timer and navigate to home page
   */
  const handleCancelAndNavigate = () => {
    clearTimeout(timeoutRef.current)
    navigate('/')
  }

  /**
   * Navigate to the next form directly
   */
  const handleNavigateToForm = () => {
    clearTimeout(timeoutRef.current)
    navigate('/email-form2')
  }

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-darkColor">
      <div className="flex h-full flex-col justify-between bg-primaryColor">
        <Header onCancel={handleCancelAndNavigate} />

        <main className="mx-6 flex h-full flex-col items-stretch justify-around text-lightColor vsm:mx-5">
          <p className="text-center text-3xl font-bold vsm:text-4xl">
            {timerFrameData.title}
          </p>

          <p className="text-center text-8xl font-bold text-hoverColor">
            {counter}
          </p>

          <div className="flex w-full flex-col items-center">
            <p className="mb-9 w-[85%] text-center text-2xl">
              {timerFrameData.description}
            </p>

            <button
              className="h-20 w-full rounded-rad bg-lightColor text-xl font-semibold text-footerColor hover:opacity-90"
              onClick={handleNavigateToForm}
            >
              {timerFrameData.button}
            </button>
          </div>
        </main>

        <footer
          className="flex cursor-pointer items-center justify-center border border-primaryColor bg-footerColor p-1 text-sm font-light text-lightColor"
          onClick={handleCancelAndNavigate}
        >
          Supported by TechMate
        </footer>
      </div>
    </section>
  )
}
