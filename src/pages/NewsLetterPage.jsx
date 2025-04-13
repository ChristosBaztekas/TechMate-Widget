import { useState, useEffect } from 'react'
import { postUserEmail } from '@/API/techMateApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFormID } from '@/store/Slices/chatbotApiSlice'
import { setFormSubmitted } from '@/store/Slices/userSlice'
// Components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const NewsLetterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { conversationId, texts } = useSelector((state) => state.chatbotApi)

  // Get form-b data from redux state
  const formData = texts?.forms?.['form-b']?.form || {
    title: 'Newsletter!',
    description:
      'Θα λαμβάνετε εντελώς δωρεάν, newsletter με επιμορφωτικό υλικό!',
    input: 'E-mail*',
    button: 'Δωρεάν Ανάλυση Αναγκών!',
    disclaimerText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }

  const handleSend = async () => {
    if (!email || isSubmitting) return

    try {
      setIsSubmitting(true)
      const response = await postUserEmail(conversationId, email)
      dispatch(setFormID(response.form_id))
      dispatch(setFormSubmitted(true))
      navigate('/submitted', { state: { formType: 'form-b' }, replace: true })
    } catch (error) {
      console.error('Error while posting user email', error)
      setIsSubmitting(false)
    }
  }

  // Prevent any unnecessary API calls
  useEffect(() => {
    if (!conversationId) {
      console.warn('[NewsLetterPage] No conversation ID found')
      // You might want to handle this case, perhaps redirect back to main page
    }
  }, [conversationId])

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-x-hidden bg-darkColor">
      <div className="flex h-full flex-col justify-between bg-primaryColor">
        {/* Header */}
        <Header />

        {/* Main */}
        <main className="mx-5 flex h-full flex-col items-center justify-around overflow-scroll text-lightColor">
          {/* Title + Description */}
          <div className="flex flex-col items-center gap-7 text-center">
            <h1 className="text-4xl font-bold">{formData.title}</h1>
            <p className="w-[90%] text-2xl font-semibold">
              {formData.description}
            </p>
          </div>

          {/* Email Input + Button */}
          <div className="w-full sm:mt-8">
            <input
              placeholder={formData.input}
              type="email"
              className="mb-4 h-16 w-full rounded-rad p-5 text-xl text-black/70 outline-none vsm:h-20"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-1 flex w-full">
              <button
                className="h-16 w-full rounded-rad bg-hoverColor text-xl font-semibold text-lightColor hover:opacity-90 vsm:h-20 vsm:text-2xl"
                aria-label="I want an OFFER!"
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                onClick={handleSend}
              >
                {formData.button}
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-left text-xs font-medium">
            {formData.disclaimerText}
          </p>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </section>
  )
}

