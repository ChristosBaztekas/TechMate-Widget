import { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { postUserInfo } from '@/API/techMateApi'
import { useNavigate } from 'react-router-dom'
import { setFormID } from '@/store/Slices/chatbotApiSlice'
import { setFormSubmitted } from '@/store/Slices/userSlice'
import { ErrorIcon } from '@/utils/icons.util'

// Components
import Header from './Header'
import Footer from './Footer'

export const PhoneLayout = ({ icon }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { conversationId, texts } = useSelector((state) => state.chatbotApi)

  // Destructure form texts safely (with fallbacks)
  const formTexts = texts?.forms?.['form-a']?.form || {}
  const {
    input1 = 'Ονοματεπώνυμο',
    input2 = 'Τηλέφωνο*',
    buttonLeft = 'Newsletter!',
    buttonRight = 'Λάβε ΠΡΟΣΦΟΡΑ!',
    disclaimerText = '',
    icon: formIcon, // from API
  } = formTexts

  // Prioritize API icon, fallback to prop icon
  const displayedIcon = formIcon || icon

  const handleSend = async () => {
    if (isSubmitting) return
    try {
      setIsSubmitting(true)
      setNameError('')
      setPhoneError('')
      const response = await postUserInfo(conversationId, name, phone)
      dispatch(setFormID(response.form_id))
      dispatch(setFormSubmitted(true))
      navigate('/submitted', { state: { formType: 'form-a' }, replace: true })
    } catch (error) {
      setPhoneError(error.response?.data?.msg)
      setIsSubmitting(false)
    }
  }

  return (
    <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col overflow-x-hidden bg-primaryColor">
      <div className="flex h-full flex-col justify-between">
        <Header />

        <main className="mx-5 flex h-full flex-col items-center justify-around overflow-scroll text-lightColor">
          <img
            src={displayedIcon}
            alt="phone"
            className="vsm:w-40"
            loading="lazy"
          />
          <div className="w-full">
            <div className="relative">
              <input
                placeholder={input1}
                className="w-full rounded-rad bg-lightColor p-5 pr-12 text-xl text-black/70 outline-none"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setNameError('')
                }}
              />
              {nameError && (
                <div className="group absolute right-4 top-1/2 -translate-y-1/2 w-fit">
                  <ErrorIcon />
                  <div className="absolute right-6 bottom-7 translate-x-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 w-[198px]">
                    <div className="rounded bg-[#D9D9D9] px-2 py-1 text-xs text-[#6D6D6D] font-medium">
                      {nameError}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {nameError && (
              <p className="my-2 text-xs">{nameError}</p>
            )}

            <div className="relative mt-3">
              <input
                placeholder={input2}
                className="w-full rounded-rad bg-lightColor p-5 pr-12 text-xl text-black/70 outline-none"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setPhoneError('')
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
              <p className="mt-2 text-xs">{phoneError}</p>
            )}

            <div className="mt-4 flex w-full flex-col gap-2 vsm:flex-row sm:gap-5">
              <button
                className="h-16 w-full rounded-rad bg-lightColor text-xl font-bold text-hoverColor hover:opacity-90 sm:text-2xl"
                onClick={() => navigate('/newsletter')}
              >
                {buttonLeft}
              </button>
              <button
                className="h-16 w-full rounded-rad bg-hoverColor text-xl font-bold text-lightColor hover:opacity-90 sm:text-2xl"
                style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                onClick={handleSend}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : buttonRight}
              </button>
            </div>
          </div>

          <p className="my-2 text-left text-xs font-medium">{disclaimerText}</p>
        </main>

        <Footer />
      </div>
    </section>
  )
}

// Prop types validation
PhoneLayout.propTypes = {
  icon: propTypes.string.isRequired, // Expecting fallback icon prop
}