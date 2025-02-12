import PropTypes from "prop-types";
import ChatLogo from "../assets/images/ChatLogo.jpg"
const Response = ({ text }) => {
  // Remove "Γεια σας!" from the text
  const modifiedText = text.replace("Γεια σας!", "");

  return (
    <div className="flex justify-start items-start gap-2 sm:gap-4">
      {/* Logo Container */}
      <div className="flex justify-center items-center flex-shrink-0 w-12 h-12 mt-2 bg-lightColor rounded-full text-sm font-light overflow-hidden">
        <img src={ChatLogo} alt="Chatbot Logo" />
      </div>
      {/* Chat Message */}
      <div className="w-fit bg-lightColor text-darkColor font-light p-4 rounded-[20px]">
        {text.includes("Γεια σας!") && <div>Γεια σας!</div>}
        {modifiedText}
      </div>
    </div>
  );
};

Response.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Response;