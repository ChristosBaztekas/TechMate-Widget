import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ChatLogo from '../assets/images/bot.webp'

const Response = ({ text }) => {
  const imageUrl = useSelector((state) => state.chatbotApi.imageUrl)

  return (
    <div className="flex animate-fadeIn items-start justify-start gap-2 sm:gap-4">
      {/* Logo Container */}
      <div className="mt-2 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-lightColor text-sm font-light">
        <img
          src={imageUrl || ChatLogo}
          alt="Chatbot Logo"
          loading="lazy"
          className="h-[50px] w-[50px] object-contain"
        />
      </div>

      {/* Chat Message */}
      <div className="prose prose-sm w-fit max-w-none rounded-rad bg-lightColor p-4 font-light text-darkColor">
        {/* Render raw HTML from backend */}
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    </div>
  )
}

Response.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Response