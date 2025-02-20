import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { setChatState } from "@/store/Slices/userSlice";
import { fetchUserQuestion } from "@/store/Slices/chatbotApiSlice";
import * as Icons from "@/utils/icons.util"; // Import all icons
import Logo from "@/assets/images/Logo.webp"; // Import logo image
// Components
import Query from "@/components/Query";
import Questions from "@/components/Questions";
import Response from "@/components/Response";

const formsMap = {
  a: "phone-form1",
  b: "newsletter",
  c: "congratulations",
};

export const StartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const { messages, conversationId } = useSelector((state) => state.chatbotApi);

  const handleSendClick = async () => {
    if (!userInput || !conversationId) return;
    dispatch(fetchUserQuestion(userInput));
    setUserInput("");
  };

  useEffect(() => {
    // Scroll to the bottom of the chat section
    const chatSection = document.querySelector(".overflow-scroll");
    chatSection.scrollTop = chatSection.scrollHeight;
  }, [messages]); // Ensure it runs when messages change

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.text.startsWith("form")) {
        const lastChar = lastMessage.text.slice(-1);
        const form = formsMap[lastChar];

        // Delete Last Message Before Navigate (Forms Messages)
        dispatch({
          type: "chatbotApi/removeLastMessage",
        });

        navigateWithoutReload(`/${form}`);
      }
    }
  }, [messages]);

  const navigateWithoutReload = (path) => {
    dispatch(setChatState(true));
    navigate(path);
  };

  return (
    <section className="flex flex-col h-screen overflow-hidden w-full bg-darkColor fixed bottom-0 right-0 z-50">
      <header className="relative flex justify-between items-start vsm:items-center text-primaryColor py-3 px-5 vsm:px-7 h-20 transition-all">
        {/* Pattern Icon */}
        <span className="absolute right-0 left-0 top-0 sm:-top-3 w-full h-fit">
          <Icons.PatternIcon />
        </span>

        {/* Logo and Greeting */}
        <div className="flex justify-center items-center z-20 text-lightColor">
          <button
            className="cursor-pointer hover:text-hoverColor"
            onClick={() => {
              dispatch(setChatState(true));
              navigate("/"); // Go back to the previous page properly
            }}
            aria-label="Go back"
          >
            <Icons.ArrowIcon />
          </button>
          <img
            src={Logo} alt="logo" className="w-16 vsm:w-auto" loading="lazy"
            onClick={() => {
              navigate("/first");
            }}
          />
          <h1 className="font-bold">Γεια σας! 👋</h1>
        </div>

        {/* Refresh and Close Icons */}
        <div className="flex justify-center items-center gap-2 z-20 text-lightColor">
          <button
            className="cursor-pointer hover:text-hoverColor hover:animate-spin"
            onClick={() => navigate(0)} // Full refresh if needed
            aria-label="Refresh page"
          >
            <Icons.RefreshIcon />
          </button>
          <button
            className="hover:text-hoverColor cursor-pointer"
            onClick={() => {
              dispatch(setChatState(true));
              navigate("/"); // Redirect to home
            }}
            aria-label="Close"
          >
            <Icons.CloseIcon />
          </button>
        </div>
      </header>

      {/* Chat Section */}
      <div className="flex flex-col gap-5 px-4 py-4 sm:px-8 overflow-scroll overflow-x-hidden flex-grow">
        {messages.map((message, index) => {
          if (message.text.startsWith("form")) {
            const lastChar = message.text.slice(-1);
            const form = formsMap[lastChar];

            // Ensure navigation updates properly
            navigateWithoutReload(`/${form}`);

            return null; // Prevent rendering components
          }

          return (
            <div key={index} className="flex flex-col gap-5">
              {message.query ? <Query query={message.query} /> : null}
              <Response text={message.text} />
              <Questions questionsArr={message.questions} />
            </div>
          );
        })}
      </div>

      <div className="flex p-6 justify-center items-start bg-gradient-to-r from-primaryColor to-gradientColor h-18">
        {/* Textarea for typing the message */}
        <textarea
          placeholder="Πληκτρολογήστε την ερώτησή σας..."
          className="w-full min-h-10 max-h-24 text-sm vsm:text-base rounded-rad pl-5 p-2 outline-none resize-none overflow-hidden"
          aria-label="Message input field"
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        {/* Submit button for sending the message */}
        <button
          type="submit"
          className="ml-6 mt-2 text-white font-bold hover:text-hoverColor"
          onClick={handleSendClick}
          onKeyDown={handleKeyDown}
        >
          Send
        </button>
      </div>

      <footer
        className="flex justify-center items-center font-light text-sm border border-primaryColor text-lightColor bg-footerColor p-1"
        onClick={() => {
          navigate("/first");
        }}
      >
        Supported by TechMate
      </footer>
    </section>
  );
};

StartPage.propTypes = {
  radius: propTypes.string,
};