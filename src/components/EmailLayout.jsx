import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { postUserEmail, postUserPhone } from '@/API/techMateApi'
import { setFormID } from '@/store/Slices/chatbotApiSlice'
import { setFormSubmitted } from '@/store/Slices/userSlice'
import { ErrorIcon } from '@/utils/icons.util'

// Components
import Header from './Header'
import Footer from './Footer'

export const EmailLayout = ({ formType = 'form-c' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [localFormId, setLocalFormId] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { texts, conversationId } = useSelector((state) => state.chatbotApi)

  /**
   * Default form structure in case API returns nothing
   */
  const formDefaults = {
    firstForm: {
      icon: 'https://data.techmate.gr/icons/email.webp',
      input: 'E-mail',
      button: 'Θέλω ΠΡΟΣΦΟΡΑ!',
      disclaimerText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    secondForm: {
      icon: 'https://data.techmate.gr/icons/phoneOffer.webp',
      input: 'Τηλέφωνο',
      button: 'Υποβάλλω!',
      disclaimerText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  }

  /**
   * Merge defaults with API response
   */
  const formData = {
    ...formDefaults,
    ...(texts?.forms?.[formType] || {}),
    firstForm: {
      ...formDefaults.firstForm,
      ...(texts?.forms?.[formType]?.firstForm || {}),
    },
    secondForm: {
      ...formDefaults.secondForm,
      ...(texts?.forms?.[formType]?.secondForm || {}),
    },
  }

  const handleSendEmail = async () => {

    try {
      setIsSubmitting(true)
      setEmailError('')
      const response = await postUserEmail(conversationId, email)

      if (response?.form_id) {
        setLocalFormId(response.form_id)
        dispatch(setFormID(response.form_id))
        setStep(2)
      }
    } catch (error) {
      setEmailError(error.response?.data?.msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendPhone = async () => {

    if (!localFormId) return

    try {
      setIsSubmitting(true)
      setPhoneError('')
      await postUserPhone(conversationId, {
        phone,
        form_id: localFormId,
      })

      dispatch(setFormSubmitted(true))
      navigate('/submitted', { state: { formType }, replace: true })
    } catch (error) {
      setPhoneError(error.response?.data?.msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-x-hidden rounded-rad bg-darkColor">
      <div className="flex h-full flex-col justify-between bg-primaryColor">
        <Header />

        <main className="mx-5 flex h-full flex-col items-center justify-around overflow-scroll text-lightColor">
          <img
            src={
              step === 1 ? formData.firstForm.icon : formData.secondForm.icon
            }
            alt={step === 1 ? 'email' : 'phone'}
            className="vsm:w-40"
            loading="lazy"
          />

          {step === 1 ? (
            <div className="mt-8 w-full">
              <div className="relative">
                <input
                  placeholder={formData.firstForm.input}
                  type="email"
                  className="h-20 w-full rounded-rad border border-transparent bg-lightColor p-5 pr-12 text-xl text-black/70 outline-none vsm:h-[70px]"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSubmitting) {
                      e.preventDefault()
                      handleSendEmail()
                    }
                  }}
                />
                {emailError && (
                  <div className="group absolute right-4 top-1/2 -translate-y-1/2 w-fit">
                    <ErrorIcon />
                    <div className="absolute right-6 bottom-7 translate-x-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 w-[198px]">
                      <div className="rounded bg-[#D9D9D9] px-2 py-1 text-xs text-[#6D6D6D] font-medium">
                        {emailError}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="my-2 text-xs">{emailError}</p>
              )}

              <div className="mt-3 flex w-full">
                <button
                  className="h-20 w-full rounded-rad bg-lightColor text-2xl font-semibold text-footerColor hover:opacity-90 vsm:h-[70px]"
                  aria-label="I want an OFFER!"
                  onClick={handleSendEmail}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : formData.firstForm.button}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 w-full">
              <div className="relative">
                <input
                  placeholder={formData.secondForm.input}
                  type="tel"
                  className="h-20 w-full rounded-rad border border-transparent bg-lightColor p-5 pr-12 text-xl text-black/70 outline-none vsm:h-[70px]"
                  aria-label="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setPhoneError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSubmitting) {
                      e.preventDefault()
                      handleSendPhone()
                    }
                  }}
                />
                {phoneError && (
                  <div className="group absolute right-4 top-1/2 -translate-y-1/2 w-fit">
                    <ErrorIcon />
                    <div className="absolute right-6 bottom-7 translate-x-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 w-[198px]">
                      <div className="rounded bg-[#D9D9D9] px-2 py-1 text-xs text-[#6D6D6D] font-medium">
                        {phoneError}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {phoneError && (
                <p className="my-2 text-xs">{phoneError}</p>
              )}

              <div className="mt-3 flex w-full">
                <button
                  className="h-20 w-full rounded-rad bg-lightColor text-2xl font-semibold text-footerColor hover:opacity-90 vsm:h-[70px]"
                  aria-label="Submit Phone Number"
                  onClick={handleSendPhone}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : formData.secondForm.button}
                </button>
              </div>
            </div>
          )}

          <p className="mt-4 text-left text-xs font-medium">
            {step === 1
              ? formData.firstForm.disclaimerText
              : formData.secondForm.disclaimerText}
          </p>
        </main>

        <Footer />
      </div>
    </section>
  )
}

EmailLayout.propTypes = {
  formType: propTypes.string, // For example: 'form-c'
}