import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChatState } from '@/store/Slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'
import { postFeedback } from '@/API/techMateApi'

const Feedback = () => {
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false)
    const [showFeedbackOptions, setShowFeedbackOptions] = useState(true)
    const [isDisliked, setIsDisliked] = useState(false)
    const [feedbackDescription, setFeedbackDescription] = useState('')
    const textareaRef = useRef(null)
    const navigate = useNavigate()
    const { logoUrl, texts, conversationId } = useSelector((state) => state.chatbotApi)

    // Destructure texts from `welcome` instead of `greetings`
    const feedback = texts?.feedback || {}

    const header = feedback.header || 'Γεια σας! 👋'
    const subHeader = feedback.subHeader || 'Μας ενδιαφέρει η γνώμη σας!'
    const experience = feedback.experience || 'Πώς ήταν η εμπειρία σας  χρησιμοποιώντας το TechMate;'
    const returnToChatTitle = feedback.returnToChatTitle || 'Επιστροφή στο Chat'
    const returnToChatDesc = feedback.returnToChatDesc || 'Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!'
    const footerText = feedback.footerText || 'www.techai.gr'

    // Function to adjust textarea height
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
            const rows = Math.ceil(scrollHeight / lineHeight)

            if (rows > 1) {
                textarea.style.height = `${scrollHeight}px`
            } else {
                textarea.style.height = `${lineHeight}px`
            }
        }
    }

    // Handle textarea input
    const handleTextareaChange = (e) => {
        setFeedbackDescription(e.target.value)
        adjustTextareaHeight()
    }

    const handleFeedback = async (type) => {
        if (type === 'helpful') {
            if (!isLiked && !isDisliked) {
                setIsLiked(true)
                setIsDisliked(false)
                setShowFeedbackOptions(false)
            }
        } else {
            if (!isDisliked && !isLiked) {
                setIsDisliked(true)
                setIsLiked(false)
                setShowFeedbackOptions(false)
            }
        }
    }

    const handleSubmitFeedback = async () => {
        if (feedbackDescription.trim()) {
            // Send feedback with description
            await postFeedback(conversationId, null, isLiked ? 1 : 0, null, feedbackDescription)
            setFeedbackDescription('')
            // Navigate after sending feedback
            dispatch(setChatState(false))
            navigate('/')
        }
    }

    // Auto-send feedback when navigating away
    const handleNavigation = async () => {
        if (isLiked || isDisliked) {
            // Send feedback with or without description
            await postFeedback(conversationId, null, isLiked ? 1 : 0, null, feedbackDescription)
            setFeedbackDescription('')
        }
        dispatch(setChatState(false))
        navigate('/')
    }

    // Handle enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmitFeedback()
        }
    }

    return (
        <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col bg-darkColor">
            <div className="flex h-full flex-col">
                {/* Header */}
                <header className="relative flex items-start justify-between bg-primaryColor px-5 py-3 text-primaryColor transition-all vsm:px-7">
                    {/* Pattern Icon */}
                    <span className="absolute -bottom-12 left-0 right-0 h-fit w-full vsm:-bottom-16">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 574 304" fill="none">
                            <path d="M287 277.937C286.878 277.492 286.868 277.457 286.868 277.454C286.869 277.454 286.871 277.454 286.872 277.453C286.875 277.452 286.879 277.451 286.884 277.449C286.895 277.446 286.912 277.442 286.935 277.436C286.979 277.423 287.045 277.406 287.132 277.382C287.307 277.334 287.567 277.264 287.909 277.172C288.593 276.988 289.602 276.719 290.908 276.377C293.52 275.693 297.317 274.717 302.058 273.553C311.54 271.223 324.8 268.136 339.915 265.1C370.134 259.03 407.806 253.161 437.514 254L440.027 254.085C466.221 255.117 499.113 260.796 525.75 266.291C539.502 269.128 551.596 271.918 560.251 273.999C564.579 275.039 568.047 275.903 570.434 276.506C571.627 276.807 572.55 277.044 573.175 277.205C573.294 277.236 573.403 277.264 573.5 277.289V0.5H0.5V277.562C0.653814 277.608 0.85685 277.667 1.10645 277.739C1.74042 277.924 2.67773 278.194 3.89062 278.539C6.31695 279.228 9.84602 280.214 14.2549 281.397C23.0732 283.765 35.4108 286.926 49.4863 290.098C77.6474 296.443 112.728 302.823 140.503 303L141.838 303.004C170 302.982 205.9 296.7 234.955 290.365C249.707 287.149 262.685 283.922 271.975 281.498C276.619 280.286 280.342 279.275 282.902 278.567C284.183 278.214 285.173 277.936 285.843 277.746C286.178 277.651 286.433 277.579 286.604 277.53C286.689 277.506 286.754 277.487 286.797 277.475C286.818 277.469 286.834 277.464 286.845 277.461C286.85 277.459 286.855 277.458 286.857 277.457C286.859 277.457 286.86 277.456 286.86 277.456C286.861 277.457 286.867 277.477 287 277.937ZM287 277.937L286.867 277.454L286.861 277.456L287 277.937Z" fill="currentColor" stroke="currentColor" />
                        </svg>
                    </span>

                    {/* Logo and Welcome Text */}
                    <div className="z-20 flex flex-col w-full items-start justify-center text-lightColor vsm:gap-2">
                        <img
                            src={logoUrl || Logo}
                            alt="logo"
                            className="my-5 w-14 vsm:w-auto xl:w-20"
                            loading="lazy"
                        />
                        {(isLiked || isDisliked) ? (
                            <h1 className="text-3xl font-bold text-center max-w-[296px] mb-4 mx-auto w-full">
                                {isLiked ? 'Ευχαριστούμε για το χρόνο σας!' : 'Μας ενδιαφέρει η γνώμη σας!'}
                            </h1>
                        ) : (
                            <>
                                <h1 className="ml-5 text-3xl font-bold">{header}</h1>
                                <h2 className="mt-4 ml-5 text-lg vsm:mt-1 sm:text-xl">
                                    {subHeader} <br />
                                    {experience}
                                </h2>
                            </>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        className="z-20 my-5 cursor-pointer text-lightColor hover:text-hoverColor"
                        onClick={handleNavigation}
                    >
                        <Icons.CloseIcon />
                    </button>
                </header>

                {/* Main Links */}
                <main className="flex flex-col h-full items-center gap-4 justify-center mb-4 z-50">
                    <div className="flex flex-col items-center gap-4 w-full">
                        {showFeedbackOptions ? (
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex items-center gap-6">
                                    {!isDisliked && (
                                        <button
                                            onClick={() => handleFeedback('helpful')}
                                            className={`flex items-center gap-2 rounded-rad text-lg transition-all duration-300 ${isLiked
                                                ? 'text-hoverColor'
                                                : 'text-lightColor hover:scale-125 hover:text-hoverColor hover:-rotate-12'
                                                }`}
                                        >
                                            <Icons.LikeFeedbackIcon />
                                        </button>
                                    )}
                                    {!isLiked && (
                                        <button
                                            onClick={() => handleFeedback('not_helpful')}
                                            className={`flex items-center gap-2 rounded-rad text-lg transition-all duration-300 ${isDisliked
                                                ? 'text-hoverColor'
                                                : 'text-lightColor hover:scale-125 hover:text-hoverColor hover:-rotate-12'
                                                }`}
                                        >
                                            <Icons.DislikeFeedbackIcon />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-6 w-full" >
                                <div className="flex items-center mb-4">
                                    {!isDisliked && (
                                        <button
                                            onClick={() => handleFeedback('helpful')}
                                            className={`flex items-center gap-2 rounded-rad text-lg transition-all duration-300 ${isLiked
                                                ? 'text-hoverColor scale-110'
                                                : 'text-lightColor hover:scale-125 hover:text-hoverColor hover:-rotate-12'
                                                }`}
                                        >
                                            <Icons.LikeFeedbackIcon />
                                        </button>
                                    )}
                                    {!isLiked && (
                                        <button
                                            onClick={() => handleFeedback('not_helpful')}
                                            className={`flex items-center gap-2 rounded-rad text-lg transition-all duration-300 ${isDisliked
                                                ? 'text-hoverColor'
                                                : 'text-lightColor hover:scale-125 hover:text-hoverColor hover:-rotate-12'
                                                }`}
                                        >
                                            <Icons.DislikeFeedbackIcon />
                                        </button>
                                    )}
                                </div>
                                {(isLiked || isDisliked) && (
                                    <div className="flex w-[75%] mx-auto items-end gap-1 justify-between z-50 rounded-rad bg-lightColor px-3 py-2">
                                        <span className="flex flex-col items-start gap-2 w-full">
                                            <p className="text-xs text-[#6D6D6D]">
                                                {isLiked
                                                    ? 'Πείτε μας τι σας άρεσε...'
                                                    : 'Πείτε μας τι δεν σας άρεσε...'}
                                            </p>
                                            <textarea
                                                ref={textareaRef}
                                                className={`max-h-[50px] w-full resize-none overflow-y-auto text-sm outline-none transition-all duration-300 vsm:text-base`}
                                                aria-label="Message input field"
                                                rows={1}
                                                value={feedbackDescription}
                                                onChange={handleTextareaChange}
                                                onKeyDown={handleKeyDown}
                                                maxLength={100}
                                            />
                                        </span>
                                        <span className="flex flex-col items-center gap-2">
                                            <button
                                                type="submit"
                                                className={`font-bold text-primaryColor hover:text-hoverColor`}
                                                onClick={handleSubmitFeedback}
                                            >
                                                Send
                                            </button>
                                            <span className="text-xs text-[#6D6D6D]">{feedbackDescription.length}/100</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        {
                            (isLiked || isDisliked) && (
                                <Link
                                    to="/"
                                    onClick={handleNavigation}
                                    className="group z-50 w-[75%] mx-auto flex items-center justify-between rounded-rad bg-lightColor px-3 py-2 mt-auto"
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
                            )
                        }
                    </div>
                    {/* Return to Chat Button */}
                    {
                        (!isLiked && !isDisliked) && (
                            <Link
                                to="/"
                                onClick={handleNavigation}
                                className="group z-50 w-[75%] mx-auto flex items-center justify-between rounded-rad bg-lightColor px-3 py-2 mt-auto"
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
                        )
                    }
                </main>

                {/* Footer */}
                <footer className="flex items-center justify-center border border-primaryColor bg-footerColor p-1 text-sm font-light text-lightColor mt-auto">
                    <Link target="_blank" to="http://www.techai.gr/">
                        {footerText}
                    </Link>
                </footer>
            </div>
        </section>
    )
}

Feedback.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default Feedback 