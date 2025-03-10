import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ChatLogo from "../assets/images/bot.webp";

const Response = ({ text }) => {
  const imageUrl = useSelector((state) => state.chatbotApi.imageUrl);

  return (
    <div className="flex justify-start items-start gap-2 sm:gap-4 animate-fadeIn">
      {/* Logo Container */}
      <div className="flex justify-center items-center flex-shrink-0 w-12 h-12 mt-2 bg-lightColor rounded-full text-sm font-light overflow-hidden">
        <img
          src={imageUrl || ChatLogo}
          alt="Chatbot Logo"
          loading="lazy"
          className="w-[50px] h-[50px] object-contain"
        />
      </div>

      {/* Chat Message */}
      <div className="prose w-fit bg-lightColor text-darkColor font-light p-4 rounded-rad prose prose-sm max-w-none">
        {text.includes("Γεια σας!") && (
          <div className="mb-2 font-semibold">Γεια σας!</div>
        )}

        {/* Render raw HTML from backend */}
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>

    </div>
  );
};

Response.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Response;
