import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setChatState } from '@/store/Slices/userSlice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Icons from '@/utils/icons.util'
import Logo from '@/assets/images/Logo.webp'

const Feedback = () => {
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false)
    const [showFeedbackOptions, setShowFeedbackOptions] = useState(true)
    const [isDisliked, setIsDisliked] = useState(false)
    const navigate = useNavigate()
    const { logoUrl, texts } = useSelector((state) => state.chatbotApi)

    // Destructure texts from `welcome` instead of `greetings`
    const feedback = texts?.feedback || {}

    const header = feedback.header || 'Γεια σας! 👋'
    const subHeader = feedback.subHeader || 'Μας ενδιαφέρει η γνώμη σας!'
    const experience = feedback.experience || 'Πώς ήταν η εμπειρία σας  χρησιμοποιώντας το TechMate;'
    const returnToChatTitle = feedback.returnToChatTitle || 'Επιστροφή στο Chat'
    const returnToChatDesc = feedback.returnToChatDesc || 'Μην ανησυχείτε, δεν έχετε χάσει την συνομιλία σας!'
    const footerText = feedback.footerText || 'www.techai.gr'

    const handleFeedback = (type) => {
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

    return (
        <section className="fixed bottom-0 right-0 z-50 flex h-screen w-full flex-col bg-darkColor">
            <div className="flex h-full flex-col">
                {/* Header */}
                <header className="relative flex items-start justify-between bg-primaryColor px-5 py-3 text-primaryColor transition-all vsm:px-7">
                    {/* Pattern Icon */}
                    <span className="absolute -bottom-12 left-0 right-0 h-fit w-full vsm:-bottom-16">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 574 304" fill="none">
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
                            <h1 className="text-3xl font-bold text-center max-w-[296px] mb-4 mx-auto w-full">Ευχαριστούμε για το χρόνο σας!</h1>
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
                        onClick={() => {
                            dispatch(setChatState(true))
                            navigate('/')
                        }}
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109" fill="none">
                                                <path d="M22.0005 47.6875V109H11.0343C4.90413 109 0 104.095 0 98.0319V58.7238C0 52.6606 4.97224 47.6875 11.0343 47.6875H22.0005ZM98.6955 37.4688H66.1376V13.625C66.1376 6.13125 60.0074 0 52.5831 0H51.9701C49.2456 0 46.7935 1.635 45.7037 4.15563L27.1089 47.6875V109H89.7727C94.745 109 98.968 105.458 99.8534 100.552L108.844 49.4588C109.934 43.1912 105.166 37.4688 98.7636 37.4688H98.6955Z" fill="currentColor" />
                                            </svg>
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
                                            <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.9995 61.3125L86.9995 0H97.9657C104.096 0 109 4.90501 109 10.9681V50.2762C109 56.3394 104.028 61.3125 97.9657 61.3125H86.9995ZM10.3045 71.5312L42.8624 71.5312V95.375C42.8624 102.869 48.9926 109 56.4169 109H57.0299C59.7544 109 62.2065 107.365 63.2963 104.844L81.8911 61.3125L81.8911 0L19.2273 0C14.255 0 10.032 3.5425 9.14655 8.4475L0.155647 59.5412C-0.934158 65.8088 3.83374 71.5312 10.2364 71.5312H10.3045Z" fill="currentColor" />
                                            </svg>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109" fill="none">
                                                <path d="M22.0005 47.6875V109H11.0343C4.90413 109 0 104.095 0 98.0319V58.7238C0 52.6606 4.97224 47.6875 11.0343 47.6875H22.0005ZM98.6955 37.4688H66.1376V13.625C66.1376 6.13125 60.0074 0 52.5831 0H51.9701C49.2456 0 46.7935 1.635 45.7037 4.15563L27.1089 47.6875V109H89.7727C94.745 109 98.968 105.458 99.8534 100.552L108.844 49.4588C109.934 43.1912 105.166 37.4688 98.7636 37.4688H98.6955Z" fill="currentColor" />
                                            </svg>
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
                                            <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.9995 61.3125L86.9995 0H97.9657C104.096 0 109 4.90501 109 10.9681V50.2762C109 56.3394 104.028 61.3125 97.9657 61.3125H86.9995ZM10.3045 71.5312L42.8624 71.5312V95.375C42.8624 102.869 48.9926 109 56.4169 109H57.0299C59.7544 109 62.2065 107.365 63.2963 104.844L81.8911 61.3125L81.8911 0L19.2273 0C14.255 0 10.032 3.5425 9.14655 8.4475L0.155647 59.5412C-0.934158 65.8088 3.83374 71.5312 10.2364 71.5312H10.3045Z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {(isLiked || isDisliked) && (
                                    <div className="flex w-[75%] mx-auto items-end justify-between z-50 rounded-rad bg-lightColor px-3 py-2">
                                        <span className="flex flex-col items-start gap-2 w-full">
                                            <p className="text-xs text-[#6D6D6D]">Πείτε μας τι δεν σας άρεσε...</p>
                                            <textarea
                                                className={`max-h-40 w-full resize-none overflow-scroll text-sm outline-none transition-all duration-300 vsm:text-base`}
                                                aria-label="Message input field"
                                                rows={1}
                                            />
                                        </span>
                                        <span className="flex flex-col items-center gap-2">
                                            <button type="submit" className={`font-bold text-primaryColor hover:text-hoverColor`} >
                                                Send
                                            </button>
                                            <span className="text-xs text-[#6D6D6D]">0/100</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        {
                            (isLiked || isDisliked) && (
                                <Link
                                    to="/"
                                    onClick={() => dispatch(setChatState(false))}
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
                                onClick={() => dispatch(setChatState(false))}
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