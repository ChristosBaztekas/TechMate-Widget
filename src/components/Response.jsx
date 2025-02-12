import propTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const Response = ({ text }) => {
  return (
    <div className="flex justify-start items-start gap-2 sm:gap-4">
      {/* Logo Container */}
      <div className="flex justify-center items-center flex-shrink-0 w-12 h-12 mt-2 bg-lightColor rounded-full text-sm font-light">
        Logo
      </div>
      {/* Chat Message */}
      <div className="w-fit bg-lightColor sm:text-lg text-darkColor font-light p-4 rounded-[20px]">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

Response.propTypes = {
  text: propTypes.string,
};

export default Response;
